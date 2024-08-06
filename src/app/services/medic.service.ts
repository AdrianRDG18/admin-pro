import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MedicResponseInterface } from '../interfaces/medic-response.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  private api_base_url = environment.API_BASE_URL;

  constructor(private _http: HttpClient){}

  get headers(): any{
    return {
      headers: {
        "x-token": localStorage.getItem('token')
      }
    }
  }

  getMedics(page: number = 1, limit: number = 10): Observable<MedicResponseInterface>{
    const url = `${this.api_base_url}/medics?page=${page}&limit=${limit}`;
    return this._http.get(url, this.headers)
               .pipe(
                map((resp: any) =>{
                  return resp.medics;
                })
               );
  }

}
