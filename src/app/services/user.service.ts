import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { createUserFormInterface } from '../interfaces/create-user-form.interface';
import { LoginFormInterface } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../models/user.model';

declare const google : any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_url_base: string = environment.API_URL_BASE;

  public user: User | undefined;

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
                    localStorage.setItem('email_logged', resp.email);
                  })
                );
  }

  validateToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this._http.get(`${this.api_url_base}/login/renew`, {
      headers: { 'x-token': token }
    }).pipe(
      // To save the new token in the local storage
      tap( (resp: any) => {

        const {email, google, name, role, image, uid, status} = resp.user;
        this.user = new User(name, email, '', image, google, role, uid, status);
        this.user.printUSer();

        localStorage.setItem('token', resp.new_token);
      }),
      map( resp => true ),
      // catchError is for handle errors
      catchError(error => {
        console.log(error);
        return of(false)
      })
    );
  }

  logout(){

    const email_logged = localStorage.getItem('email_logged') || null;

    localStorage.removeItem('token');

    (email_logged != null) ? google.accounts.id.revoke(email_logged, () => { localStorage.removeItem('email_logged') }) : '';
  }
}
