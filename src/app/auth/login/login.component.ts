import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit, AfterViewInit{

  @ViewChild('googleBtn')googleBtn!: ElementRef;

  private formSubmitted: boolean = false;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(localStorage.getItem('email') || '', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(false)
  });

  constructor(private _router: Router,
              private _userService: UserService,
              private _swal: AlertService
  ){}

  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.loginForm.get('remember')?.setValue(true);
    }
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "956878190988-389l74jnk83v67bakbfqdi6kccfe8lgs.apps.googleusercontent.com",
      callback: this.handleCredentialResponse
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    console.log("Encoded JWT ID token: " + response.credential);
  }

  login(){

    this.formSubmitted = true;

    if(this.loginForm.valid){
      this._swal.swalProcessingRequest();
      Swal.showLoading();

      this._userService.login(this.loginForm.value)
          .subscribe({
            next: (resp) => {
              (this.loginForm.get('remember')?.value) ? localStorage.setItem('email', this.loginForm.get('email')?.value) : localStorage.removeItem('email');
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
