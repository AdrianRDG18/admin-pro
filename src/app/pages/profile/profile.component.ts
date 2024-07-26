import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { FileService } from 'src/app/services/file.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent {

  public profileForm: FormGroup;
  private formSubmited: boolean = false;
  public user: User | undefined;
  public imageToUpload: File | undefined;
  public imageToShow: any = '';

  constructor(private _userService: UserService,
              private _swal: AlertService,
              private _fileService: FileService
  ){

    this.user = this._userService.user;
    this.profileForm = new FormGroup({
      name: new FormControl(this.user!.name, [ Validators.required, Validators.minLength(3)]),
      email: new FormControl(this.user!.email, [ Validators.required, Validators.email ])
    });

  }

  updateProfile(){

    this.formSubmited = true;

    if(this.profileForm.valid){

      this._swal.swalProcessingRequest();
      Swal.showLoading();
      this._userService.updateUser(this.profileForm.value)
          .subscribe({
            next: (resp: any) => {

              // const { name, email } = this.profileForm.value;
              const { name, email } = resp.user;
              this.user!.name = name;
              this.user!.email = email;

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

  setImage(event: any){

    if(event.target.files[0]){

      this.imageToUpload = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () =>{
        this.imageToShow = reader.result;
      }
    }else{
      this.imageToUpload = undefined;
      this.imageToShow = null;
     }

  }

  uploadImage(){

    if(this.imageToUpload){
      this._swal.swalProcessingRequest();
      Swal.showLoading();
      this._fileService.uploadFile(this.imageToUpload, 'users', this.user!.uid)
          .subscribe({
            next: (resp: any) => {

              this._fileService.getImageAPI(resp.file_name, 'users')
                  .subscribe({
                    next: (image: any) => {
                      this._userService.user!.imageURL = image;
                      this.imageToUpload = undefined;
                      this.imageToShow = null;
                    }, error: (error: any) => {
                      console.log(error);
                      this._swal.swalError('Something went wrong on uploadImage.getImageAPI:', error.error.msg);
                    }
                  });

            }, error: (error: any) => {
              console.log(error);
              this._swal.swalError('Something went wrong on uploadImage:', error.error.msg);
            }, complete: () => this._swal.swalSuccess('Image uploaded', 'The image was uploaded successfully')
          });
    }
  }

}
