import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import Swal from 'sweetalert2';
import { AlertService } from './alert.service';
import { FileService } from './file.service';
import { CatchErrorService } from './catch-error.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private _displayModal: boolean = false;
  public user: User | undefined;
  public imageUpdated: EventEmitter<string> =  new EventEmitter<string>;

  constructor(private _swal: AlertService,
              private _fileService: FileService,
              private _catchError: CatchErrorService
  ){}

  get displayModal(): boolean {
    return this._displayModal;
  }

  closeModal(){
    this._displayModal = false;
  }

  openModal(user: User){
    this.user = user;

    if(user.google){
      this.user.imageURL = user.image;
    }else{
      this._swal.swalProcessingRequest();
      Swal.showLoading();
  
      this._fileService.getImageAPI(user?.image)
          .subscribe({
            next: (resp: any) => {
              this.user!.imageURL = resp
            }, error: (error) => {
              console.log(error);
              this._catchError.scaleError('Something went wrong on: getImageAPI', error);
            }, complete: () => Swal.close()
          });
    }
    this._displayModal = true;

  }


}
