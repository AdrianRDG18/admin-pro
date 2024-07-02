import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

// This is a workaround to avoid TypeScript errors when using google.accounts.id
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
              private _swal: AlertService,
              private _ngZone: NgZone
  ){}

  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.loginForm.get('remember')?.setValue(true);
    }
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  // This method is used to initialize the Google Sign-In button
  googleInit(){
    google.accounts.id.initialize({
      client_id: "956878190988-389l74jnk83v67bakbfqdi6kccfe8lgs.apps.googleusercontent.com",
      callback: (resp: any) => this.handleCredentialResponse(resp)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  // This method is used to handle the response from the Google Sign-In button
  handleCredentialResponse(response: any){
    this._swal.swalProcessingRequest();
    Swal.showLoading();
    this._userService.loginWithGoogle(response.credential)
        .subscribe({
          next: () => {
            this._ngZone.run( () => {
              this._router.navigateByUrl('/dashboard');
            });
          },
          error: (error) => {
            console.log(error);
            this._swal.swalError("Something went wrong", error.error.msg);
          },
          complete: () => Swal.close()
        });
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
              this._ngZone.run( () => {
                this._router.navigateByUrl('/dashboard');
              });
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
