import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { createUserFormInterface } from '../interfaces/create-user-form.interface';
import { LoginFormInterface } from '../interfaces/login-form.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_url_base: string = environment.API_URL_BASE;

  constructor(private _http: HttpClient) {}

  createUser(createUserForm: createUserFormInterface) {
    return this._http.post(`${this.api_url_base}/users`, createUserForm)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token);
                  })
                );
  }

  login(loginForm: LoginFormInterface){
    return this._http.post(`${this.api_url_base}/login`, loginForm)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token);
                  })
                );
  }

  loginWithGoogle(token: string){
    return this._http.post(`${this.api_url_base}/login/google`, {token: token})
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token);
                  })
                );
  }

}
