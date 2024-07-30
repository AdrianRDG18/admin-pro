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
  public imageUpdatedEvent: EventEmitter<string> =  new EventEmitter<string>;
  public imageURL = '';
  public type: string = '';
  public user?: User;
  public element_id: string = '';

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

  openModal(element: any, type: string){
    this.type = type;
    this.getImage(element, type)
    this._displayModal = true;
  }
  
  getImage(element: any, type: string){

    if(type === 'users'){
      this.user = element;
      if(element.google){
        return this.imageURL = element.image;
      }
    }
    
    this.element_id = element._id;;
  
    this._swal.swalProcessingRequest();
    Swal.showLoading();
    
    this._fileService.getImageAPI(element?.image, type)
        .subscribe({
          next: (resp: any) => {
            this.imageURL = resp
          }, error: (error) => {
            console.log(error);
            this._catchError.scaleError('Something went wrong on: getImage', error);
          }, complete: () => Swal.close()
        });

  }


}
