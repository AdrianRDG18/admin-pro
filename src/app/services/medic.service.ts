import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medic, MedicResponseInterface } from '../interfaces/medic-response.interface';
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

  getMedicById(id: string): Observable<Medic>{
    const url = `${this.api_base_url}/medics/${id}`;
    return this._http.get(url, this.headers)
               .pipe(
                map( (resp: any) =>{
                  return resp.medic;
                })
               );
  }

  createMedic(data: any): Observable<Medic>{
    const url = `${this.api_base_url}/medics`;
    return this._http.post(url, data, this.headers)
               .pipe(
                map( (resp: any) => {
                  return resp.medicdb
                })
               );
  }

  updateMedic(data: any, medic_id: string): Observable<Medic>{
    const url = `${this.api_base_url}/medics/${medic_id}`;
    return this._http.put(url, data, this.headers)
               .pipe(
                map( (resp: any) => {
                  return resp.medic_updated
                })
               );
  }

  deleteMedic(medic_id: string): Observable<any>{
    const url = `${this.api_base_url}/medics/${medic_id}`;
    return this._http.delete(url, this.headers);
  }

}
