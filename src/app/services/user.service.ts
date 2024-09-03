import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { createUserFormInterface } from '../interfaces/create-user-form.interface';
import { LoginFormInterface } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { UserResponseInterface } from '../interfaces/user-response.interface';

declare const google : any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_base_url: string = environment.API_BASE_URL;

  // Instance of class(User)
  public user?: User;

  constructor(private _http: HttpClient) {}

  get tokenOnHeader(): any{
    return { headers: {'x-token': localStorage.getItem('token') || ''} };
  }

  get uid(): string{
    return this.user?.uid || '';
  }

  createUser(createUserForm: createUserFormInterface) {
    return this._http.post(`${this.api_base_url}/users`, createUserForm)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token);
                  })
                );
  }

  updateUser(data: { name: string, email: string, role?: string}){

    data = {
      ...data,
      role: 'USER_ROLEEEEE'
    }
    return this._http.put(`${this.api_base_url}/users/${this.uid}`, data, this.tokenOnHeader );
  }

  login(loginForm: LoginFormInterface){
    return this._http.post(`${this.api_base_url}/login`, loginForm)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token);
                  })
                );
  }

  loginWithGoogle(token: string){
    return this._http.post(`${this.api_base_url}/login/google`, {token: token})
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token);
                    localStorage.setItem('email_logged', resp.email);
                  })
                );
  }

  validateToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this._http.get(`${this.api_base_url}/login/renew`, {
      headers: { 'x-token': token }
    }).pipe(
      // To save the new token in the local storage
      map( (resp: any) => {

        // Make instance of class(User) and pass the data from the response
        const {email, google, name, role, image, uid, status} = resp.user;
        this.user = new User(name, email, '', image, google, role, uid, status);

        localStorage.setItem('token', resp.new_token);
        return true;
      }),
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

  getUsers(page: number = 1, limit: number = 10): Observable<UserResponseInterface>{
    return this._http.get(`${this.api_base_url}/users?page=${page}&limit=${limit}`, this.tokenOnHeader)
                .pipe(
                  map( (response: any) => response.users )
                );
  }

  deleteUSer(uid: string){
    return this._http.delete(`${this.api_base_url}/users/${uid}`, this.tokenOnHeader);
  }

  updateRole(user: User): Observable<any>{
    const url = `${this.api_base_url}/users/${user.uid}`
    const data = {
      role: user.role,
      name: user.name,
      email: user.email
    }
    return this._http.put(url, data, this.tokenOnHeader);
  }

}
