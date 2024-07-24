import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CatchErrorService {

  constructor() {}

  scaleError(title: string, error: any){

    let errors = '';

    if(Object.keys(error).indexOf('error') > -1) {
      if(Object.keys(error.error).indexOf('errors') > -1) {
        //It could be a validations error
        const fields = Object.keys(error.error.errors);
        fields.forEach(element => {
          errors += `<strong>${element}</strong>: ${error.error.errors[element].msg} <br>`;
        });
      }
      if(Object.keys(error.error).indexOf('msg') > -1 ){
        errors = `<strong>Error:</strong> ${error.error.msg}`;
      }
    }else if(Object.keys(error).indexOf('errors') > -1){
      errors = error.errors;
    }

    return Swal.fire({
      icon: 'error',
      title: title,
      html: ` <pre> ${errors} </pre>`,
      confirmButtonColor: '#0871EF',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false
    });
  }
  


}
