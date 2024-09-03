import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private api_base_url = environment.API_BASE_URL;

  constructor(private _httpClient: HttpClient){}

  get headers(){
    return { headers: { 'x-token': localStorage.getItem('token') || ''} };
  }

  searchByTerm(collection: 'users' | 'medics' | 'hospitals', term: string, page: number, limit: number): Observable<any>{
    const url = `${this.api_base_url}/search/${collection}/${term}?page=${page}&limit=${limit}`;
    return this._httpClient.get(url, this.headers)
                .pipe(
                  map( (resp: any) => {
                    return resp.data
                  })
                );
  }

  searchAllByTerm(term: string): Observable<any>{
    const url = `${this.api_base_url}/search/${term}`;
    return this._httpClient.get(url, this.headers);
  }

}
