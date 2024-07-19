import { Component, ElementRef, ViewChild } from '@angular/core';
import { ResponseInterface } from 'src/app/interfaces/response.interface';
import { AlertService } from 'src/app/services/alert.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent {

  public response: ResponseInterface | undefined;
  public limit : number = 10;
  public loading: boolean = false;
  @ViewChild('term_user') term: ElementRef | undefined; 

  constructor(private _userService: UserService,
              private _searchService: SearchService,
              private _swal: AlertService
  ){
    this.getUserList();
  }

  getUserList(page: number = 1){
    this._swal.swalProcessingRequest();
    Swal.showLoading();
    this._userService.getUsers(page, this.limit)
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
    if(this.term?.nativeElement.value === ''){
      this.getUserList(page || 1);
    }else{
      this.findUser(this.term?.nativeElement.value, page || 1);
    }
  }

  changeLimit(){
    if(this.term?.nativeElement.value === ''){
      this.getUserList(1);
    }else{
      this.findUser(this.term?.nativeElement.value, 1);
    }
  }

  findUser(term: string, page: number = 1){

    if(term === '' || term === undefined){
      this.getUserList();
    }else{

      this.loading = true;
      this._searchService.searchByTerm('users', term, page, this.limit)
          .subscribe({
            next: (resp: ResponseInterface) => {
              this.response = resp;
            }, error: (error: any) => {
              console.log(error);
              this._swal.swalError('Sementhing went wrong on findUser: ', error.error.msg);
            }, complete: () => this.loading = false
          });
    }
  }

}
