import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent {

  private formSubmited: boolean = false;

  public profileForm: FormGroup = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [ Validators.required, Validators.email ])
  });

  constructor(private _userService: UserService,
              private _swal: AlertService
  ){}

  updateProfile(){

    this.formSubmited = true;

    if(this.profileForm.valid){

      this._swal.swalProcessingRequest();
      Swal.showLoading();
      this._userService.updateUser(this.profileForm.value)
          .subscribe({
            next: (resp: any) => {
              console.log('Profile updated:', resp);

            }, error: (error: any) => {
              console.log('Something went wrong on updateProfile:', error);
              this._swal.swalError('Something went wrong on updateProfile: ', error.error.msg);
            }, complete: () => this._swal.swalSuccess('Profile updated', "The user's data was updated successfully")
          });
    }
  }

  fieldValidation(field: string): boolean{
    if(this.profileForm.get(field)?.invalid && this.formSubmited){
      return true;
    }
    return false
  }

}
