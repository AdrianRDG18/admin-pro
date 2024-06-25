import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  private formSubmitted: boolean = false;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(false)
  });

  constructor(private _router: Router,
              private _userService: UserService,
              private _swal: AlertService
  ){}

  login(){

    this.formSubmitted = true;

    if(this.loginForm.valid){
      this._swal.swalProcessingRequest();
      Swal.showLoading();

      this._userService.login(this.loginForm.value)
          .subscribe({
            next: (resp) => {
              console.log(resp);
              // this._router.navigateByUrl('/dashboard');
            },
            error: (error) => {
              console.log(error);
              this._swal.swalError('Something went wrong', error.error.msg);
            },
            complete: () => Swal.close()
          });
    }
    
  }

  fieldValidation(field: string): boolean{
    if(this.loginForm.get(field)?.invalid && this.formSubmitted){
      return true;
    }
    return false;
  }

}
