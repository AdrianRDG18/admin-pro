import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor(private _userService: UserService,
              private _router: Router
  ){}

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
