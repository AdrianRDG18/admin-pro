import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private api_base_url = environment.API_BASE_URL;

  constructor(private _http: HttpClient,
              private _sanitaizer: DomSanitizer
  ) {}


  uploadFile(image: File, collection: string, element_id: string){
    const url = `${this.api_base_url}/upload/${collection}/${element_id}`;

    const formData = new FormData();
    formData.append('image', image);

    return this._http.put(url, formData, {
      headers: {
        'x-token': localStorage.getItem('token') || ''
      }
    })
  }

  getImageAPI(image: string, type: string): Observable<any>{
    const token = localStorage.getItem('token') || '';

    return this._http.get(`${this.api_base_url}/upload/${type}/${image}`, {
      headers: { 'x-token': token },
      // When recieve a image via http request(API), the responseType must be 'blob'
      responseType: 'blob' as 'json'
    }).pipe(
      map( (imageBlob: any) =>{
          // Create a DOMString representing the image
          let objectURL = URL.createObjectURL(imageBlob);
          // Prevent security errors with sanitizer
          return this._sanitaizer.bypassSecurityTrustUrl(objectURL);
      })
    );
  }

}
