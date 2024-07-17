import { Component } from '@angular/core';
import { ResponseInterface } from 'src/app/interfaces/response.interface';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent {

  public users: User [] = [];
  public response: ResponseInterface | undefined;
  public limit : number = 10;

  constructor(private _userService: UserService,
              private _swal: AlertService
  ){
    this.getUserList();
  }

  getUserList(page: number = 1, users_limit: number = 10){
    this._swal.swalProcessingRequest();
    Swal.showLoading();
    this._userService.getUsers(page, users_limit)
        .subscribe({
          next: (resp: ResponseInterface) => {
            this.response = resp;
          }, error: (error) => {
            console.log(error);
            this._swal.swalError('Something went wrong on getUserList: ', error.error.msg);
          }, complete: () => Swal.close()
        });
  }

  changePage(page: number | null){
    this.getUserList(page || 1, this.limit)
  }

  changeLimit(){
    this.getUserList(1, this.limit);
  }

}
