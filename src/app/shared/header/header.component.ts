import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public imageURL: any = '';
  public user : User | undefined;

  constructor(private _userService: UserService,
              private _router: Router,
              private _swal: AlertService){
    // Call getImageURL method from User class
    this.setImage(this._userService.user?.getImageURL || '');
    // Instance of class(User)
    this.user = this._userService.user;
  }

  setImage(imageData: any): void{

    // If google filed is true, the image is from google
    if(imageData.google){
      this.imageURL = imageData.image;
    }else{

      this._swal.swalProcessingRequest();
      Swal.showLoading();

      this._userService.getImageAPI(imageData.image)
          .subscribe({
            next: (image: any) => this.imageURL = image,
            error: (error) => {
              console.log(error);
              this._swal.swalError('Error', error.error);
            },
            complete: () => Swal.close()
          });
    }
  }

  logout(){
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f8bb86",
      confirmButtonText: "Yes",
      cancelButtonColor: "#BCBCBC"
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.logout();
        this._router.navigateByUrl('/login');
      }
    });
  }

}
