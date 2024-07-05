import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public imageURL: any = '';

  constructor(private _sidebarService: SidebarService,
              private _userService: UserService,
              private _router: Router,
              private _swal: AlertService){
    this.setImage(this._userService.user?.getImageURL || '');
  }

  setImage(imageData: any): void{

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

  get menu() {
    return this._sidebarService.menu;
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
