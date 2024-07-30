import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HospitalInterface, HospitalReponseInterface } from 'src/app/interfaces/hospital-response.interface';
import { AlertService } from 'src/app/services/alert.service';
import { CatchErrorService } from 'src/app/services/catch-error.service';
import { HospitalService } from 'src/app/services/hospital.service';
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
  public page: number = 1;
  private imageUpdateEvent: Subscription = new Subscription;

  constructor(private _hospitalServive: HospitalService,
              private _swal: AlertService,
              private _catchError: CatchErrorService,
              public userService: UserService,
              private _uploadImageService: UploadImageService
  ){}

  ngOnInit(): void {
    this.getHospitals();
    this.imageUpdateEvent = this._uploadImageService.imageUpdatedEvent
                                .subscribe( () => this.getHospitals());
  }
  ngOnDestroy(): void {
    this.imageUpdateEvent
  }

  getHospitals(){
    this._swal.swalProcessingRequest();
    Swal.showLoading();
    this._hospitalServive.getHospitals(this.page, this.limit)
        .subscribe({
          next: (resp: HospitalReponseInterface) => {
            this.response = resp;
            console.log(resp.docs);
          }, error: (error) => {
            console.log(error);
            this._catchError.scaleError('Something went wrong on getHospitals', error);
          }, complete: () => Swal.close()
        });
  }

  changeLimit(){

  }

  openModal(hospital: HospitalInterface): void{
    if(this.userService.user?.role === 'ADMIN_ROLE'){
      this._uploadImageService.openModal(hospital, 'hospitals');
    }
    return;
  }
}
