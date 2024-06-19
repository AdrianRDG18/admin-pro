import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { samePasswords } from 'src/app/directives/pw-validator.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  private formSubmitted: boolean = false;

  // // First way to create a form
  // public createUserForm = this.fb.group({
  //   name: ['Adrian', [Validators.required, Validators.minLength(3)]],
  //   email: ['adrian@gmail.com', [Validators.required,Validators.email]],
  //   password: ['', [Validators.required, Validators.minLength(6)]],
  //   password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
  //   terms: [false, Validators.requiredTrue]
  // }, {
  //   validators: this.samePassword()
  // });
  // constructor(private fb: FormBuilder){}

  // Second way to create a form and more recent
  public createUserForm: FormGroup = new FormGroup({
    name: new FormControl('Adrian', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('adrian@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,]),
    password_confirmation: new FormControl('', [Validators.required]),
    terms: new FormControl(false, Validators.requiredTrue)
  }, {
    validators: samePasswords
  });

  constructor(){}

  createUser(){
    console.log(this.createUserForm);
    this.formSubmitted = true;
    if(this.createUserForm.valid){
      console.log('Sending form');
    }
  }

  validationField(field: string): boolean {
    if(this.createUserForm.get(field)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  //Firts way to validate if passwords are the same
  // validationPasswords(): boolean {

  //   const pw1 = this.createUserForm.get('password')?.value;
  //   const pw2 = this.createUserForm.get('password_confirmation')?.value;

  //   if(pw1 !== pw2 && this.formSubmitted){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }

  validationPasswords(): boolean {
    if(this.createUserForm.hasError('differentPasswords') && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

}