import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HospitalInterface, HospitalReponseInterface } from '../interfaces/hospital-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private api_base_url = environment.API_BASE_URL;

  constructor(private _http: HttpClient){}

 get headers(): any{
    return {
      headers: {
        'x-token': localStorage.getItem('token')
      }
    };
  }

  getHospitals(page: number = 1, limit: number = 10): Observable<HospitalReponseInterface>{
    const url = `${this.api_base_url}/hospitals?page=${page}&limit=${limit}`;
    return this._http.get(url, this.headers)
               .pipe(
                map((resp: any) =>{
                  return resp.hospitals;
                })
               );
  }

  updateHospital(hospital: HospitalInterface): Observable<any>{
    const url = `${this.api_base_url}/hospitals/${hospital._id}`;
    return this._http.put(url, hospital, this.headers);

  }

  deleteHospital(hospital_id: string): Observable<any>{
    const url = `${this.api_base_url}/hospitals/${hospital_id}`;
    return this._http.delete(url, this.headers);
  }

}
