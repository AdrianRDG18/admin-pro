import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalReponseInterface } from 'src/app/interfaces/hospital-response.interface';
import { Medic } from 'src/app/interfaces/medic-response.interface';
import { AlertService } from 'src/app/services/alert.service';
import { CatchErrorService } from 'src/app/services/catch-error.service';
import { FileService } from 'src/app/services/file.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicService } from 'src/app/services/medic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: [
  ]
})
export class MedicComponent {

  public creation: boolean =  false;
  private medic_id: string = '';
  public medic?: Medic;
  public medicForm: FormGroup = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(3)]),
    hospital: new FormControl('', Validators.required)
  });
  private formSubmited: boolean = false;
  public hospitalsResponse!: HospitalReponseInterface;

  public imageToUpload: any;
  public imagetoShow: any;

  constructor(private router: ActivatedRoute,
              private _medicService: MedicService,
              private _swal: AlertService,
              private _catchError: CatchErrorService,
              private _hospitalService: HospitalService,
              private _routerGo: Router,
              private _fileService: FileService
  ){
    this.router.params.subscribe((params: any) =>{
      if(params.id){
        this.medic_id = params.id;
        if(params.id === 'new'){
          this.creation = true;
        }
      }
    })
  }
  
  ngOnInit(): void {
    if(!this.creation){
      this.getMedicById();
    }
    this.getHospitalsList();
  }

  getMedicById(){
    this._swal.swalProcessingRequest();
    Swal.showLoading();
    this._medicService.getMedicById(this.medic_id)
        .subscribe({
          next: (medic: Medic) => {
            this.medic = medic;
            this.medicForm.get('name')?.setValue(medic.name);
            this.medicForm.get('hospital')?.setValue(medic.hospital._id);
          }, error: (error) =>{
            console.log(error);
            this._catchError.scaleError('Something went wrong on getMedicById', error);
          }, complete: () => Swal.close()
        });
  }

  getHospitalsList(){
    this._swal.swalProcessingRequest();
    Swal.showLoading();
    this._hospitalService.getHospitals(1, 100)
        .subscribe({
          next: (resp: HospitalReponseInterface) => {
            this.hospitalsResponse = resp;
          }, error: (error) => {
            console.log(error);
            this._catchError.scaleError('Something went wrong on getHospitalsList', error);
          }, complete: () => Swal.close()
        })
  }

  setImageToUpdate(event: any){
    if(event.target.files[0]){
      this.imageToUpload= event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => this.imagetoShow = reader.result
    }else{
      this.imagetoShow = undefined;
      this.imageToUpload = undefined;
    }
  }

  fieldValidation(field: string): boolean{
    if(this.medicForm.get(field)?.invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }
  }

  saveMedic(){

    this.formSubmited = true;

    if(this.medicForm.valid){

      this._swal.swalConfirm(`${(this.creation)? 'Create' : 'Update'} medic`, '¿Do you want to continue?')
          .then((resp)=>{
            if(resp.isConfirmed){

              this._swal.swalProcessingRequest();
              Swal.showLoading();

              (this.creation) ? this.createMedic() : this.updateMedic();
            }
          });
    }
  }

  createMedic(){
    this._medicService.createMedic(this.medicForm.value)
        .subscribe({
          next: (medic: Medic) =>{
            if(this.imageToUpload){
              this._fileService.uploadFile(this.imageToUpload, 'medics', medic._id)
                  .subscribe({
                    error: (error) => {
                      console.log(error);
                      this._catchError.scaleError('Something went wrong on createMedic->uploadFile', error);
                    }
                  });
            }
          }, error: (error) => {
            console.log(error);
            this._catchError.scaleError('Something went wrong on createMedic', error);
          }, complete: () => {
            this._swal.swalConfirm('The medic was created successfully', '¿Do you want go to Medics list?')
                .then( (resp) =>{
                  if(resp.isConfirmed){
                    this._routerGo.navigateByUrl('/dashboard/medics');
                  }
                });
          }
        });
  }

  updateMedic(){
    this._medicService.updateMedic(this.medicForm.value, this.medic!._id)
        .subscribe({
          next: (resp: Medic) =>{
            if(this.imageToUpload){
              this._fileService.uploadFile(this.imageToUpload, 'medics', resp._id)
                  .subscribe({
                    error: (error) => {
                      console.log(error);
                      this._catchError.scaleError('Something went wrong on updateMedic->uploadFile', error);
                    }
                  });
            }
          },error: (error) => {
            console.log(error);
            this._catchError.scaleError('Something went wrong on updateMedic', error);
          }, complete: () => {
            this._swal.swalConfirm('The medic was updated successfully', '¿Do you want go to Medics list?')
                .then( (resp) =>{
                  if(resp.isConfirmed){
                    this._routerGo.navigateByUrl('/dashboard/medics');
                  }
                });
          }
        });
  }

}
