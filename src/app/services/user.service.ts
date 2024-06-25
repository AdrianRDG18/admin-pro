import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { createUserFormInterface } from '../interfaces/create-user-form.interface';
import { LoginFormInterface } from '../interfaces/login-form.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_url_base: string = environment.API_URL_BASE;

  constructor(private _http: HttpClient) {}

  createUser(createUserForm: createUserFormInterface) {
    return this._http.post(`${this.api_url_base}/users`, createUserForm);
  }

  login(loginForm: LoginFormInterface){
    return this._http.post(`${this.api_url_base}/login`, loginForm);
  }

}
