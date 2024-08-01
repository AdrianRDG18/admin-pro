import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { HospitalInterface, HospitalReponseInterface } from 'src/app/interfaces/hospital-response.interface';
import { AlertService } from 'src/app/services/alert.service';
import { CatchErrorService } from 'src/app/services/catch-error.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { SearchService } from 'src/app/services/search.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent {

  public response: HospitalReponseInterface | undefined;
  public limit: number = 10;
  private imageUpdateEvent: Subscription = new Subscription;
  public loading: boolean = false;
  @ViewChild('term_hospitals') term_hospitals?: ElementRef;
  public hospital!: HospitalInterface;
  @ViewChild('hospital_name') hospital_name!: ElementRef;
  @ViewChild('closeHospitalEditModal') closeHospitalEditModal!: ElementRef;

  constructor(private _hospitalServive: HospitalService,
              private _swal: AlertService,
              private _catchError: CatchErrorService,
              public userService: UserService,
              private _uploadImageService: UploadImageService,
              private _searchService: SearchService
  ){}

  ngOnInit(): void {
    this.getHospitals();
    this.imageUpdateEvent = this._uploadImageService.imageUpdatedEvent
                                .subscribe( () => this.getHospitals());
  }
  ngOnDestroy(): void {
    this.imageUpdateEvent.unsubscribe();
  }

  getHospitals(page: number = 1){
    this._swal.swalProcessingRequest();
    Swal.showLoading();
    this._hospitalServive.getHospitals(page, this.limit)
        .subscribe({
          next: (resp: HospitalReponseInterface) => {
            this.response = resp;
          }, error: (error) => {
            console.log(error);
            this._catchError.scaleError('Something went wrong on getHospitals', error);
          }, complete: () => Swal.close()
        });
  }

  findHospitalByTerm(term: string, page: number = 1){
    if(term !== ''){
      this.loading = true;
      this._searchService.searchByTerm('hospitals', term, page, this.limit)
          .subscribe({
            next: (resp: any) => {
              this.response = resp;
            }, error: (error) => {
              console.log(error);
              this._catchError.scaleError('Something went wrong on findHospitalByTerm', error);
            }, complete: () => this.loading = false
          });
    }else if(term === ''){
      this.getHospitals();
    }
  }

  changeLimit(){
    if(this.term_hospitals?.nativeElement.value === ''){
      this.getHospitals();
    }else{
      this.findHospitalByTerm(this.term_hospitals?.nativeElement.value)
    }
  }

  openModal(hospital: HospitalInterface): void{
    if(this.userService.user?.role === 'ADMIN_ROLE'){
      this._uploadImageService.openModal(hospital, 'hospitals');
    }
    return;
  }

  changePage(page: number){
    if(this.term_hospitals?.nativeElement.value === ''){
      this.getHospitals(page);
    }else{
      this.findHospitalByTerm(this.term_hospitals?.nativeElement.value, page);
    }
  }

  setHospitalToEdit(hospital: HospitalInterface){
    this.hospital = hospital;
    this.hospital_name.nativeElement.value = hospital.name;
  }

  updateHospital(){
    this._swal.swalConfirm('Update Hospital', `¿Are you sure to update this hospital?`)
        .then((result) => {
          if(result.isConfirmed){
            let hospital = {
              ...this.hospital,
              name: this.hospital_name.nativeElement.value
            }
            this._swal.swalProcessingRequest();
            Swal.showLoading();
            this._hospitalServive.updateHospital(hospital)
                .subscribe({
                  next: () => this.getHospitals(),
                  error: (error) => {
                    console.log(error);
                    this._catchError.scaleError('Something went wrong on updateHospital', error);
                  }, complete: () => this.closeHospitalEditModal.nativeElement.click()
                });
          }
        });
  }

  deleteHospital(hospital: HospitalInterface){
    this._swal.swalConfirm('Hospital deletion', `¿Are you sure to delete this hospital: <strong>${hospital.name}</strong>?`)
        .then((resp) => {
          if(resp.isConfirmed){
            this._swal.swalProcessingRequest();
            Swal.showLoading();
            this._hospitalServive.deleteHospital(hospital._id)
                .subscribe({
                  error: (error) => {
                    console.log(error);
                    this._catchError.scaleError('Something went wrong on deleteHospital', error);
                  }, complete: () => this.getHospitals()
                });
          }
        });
  }

}
