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
    });
  }
}
