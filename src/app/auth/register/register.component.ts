import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public createUserForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required,Validators.email]],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],
    terms: [false, Validators.requiredTrue]
  });

  constructor(private fb: FormBuilder){}

  creatrUser(){
    console.log(this.createUserForm.value);
  }

}
