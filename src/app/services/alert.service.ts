import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {}

  swalError(title: string, msg: string){
    return Swal.fire({
      title: title,
      text: msg,
      icon: 'error',
      confirmButtonColor: '#0871EF',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false

    });
  }

  swalProcessingRequest(){
    return Swal.fire({
      icon: 'info',
      text: 'Loading...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false
    });
  }

  swalSuccess(title: string, msg: string){
    return Swal.fire({
      title: title,
      text: msg,
      icon: 'success',
      confirmButtonColor: '#0871EF',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false
    });
  }

  swalConfirm(title: string, msg: string){
    return Swal.fire({
      title: title,
      html: msg,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0871EF',
      cancelButtonColor: '#D4D4D4',
      confirmButtonText: 'Confirm',
    })
  }

}
