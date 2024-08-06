import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CatchErrorService } from 'src/app/services/catch-error.service';
import { FileService } from 'src/app/services/file.service';
import { ImageModalService } from 'src/app/services/image-modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-image-modal',
  templateUrl: './upload-image-modal.component.html',
  styles: [
  ]
})
export class UploadImageModalComponent {

  public imageToUpload: File | undefined;
  public imageToShow: any = '';

  constructor(public modalService: ImageModalService,
              private _fileService: FileService,
              private _swal: AlertService,
              private _catchError: CatchErrorService
  ){}

  closeModal(){
    this.modalService.closeModal();
    this.imageToUpload = undefined
    this.imageToShow = null;
  }

  setImage(event: any){
    if(event.target.files[0]){

      this.imageToUpload = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => this.imageToShow = reader.result;

    }
  }

  uploadFile(){
    
    if(this.imageToUpload !== undefined){
      let element_id = '';

      this._swal.swalProcessingRequest();
      Swal.showLoading();

      if(this.modalService.type === 'users'){
        if(this.modalService.user?.uid){
          element_id = this.modalService.user.uid;
        }
      }else{
        element_id = this.modalService.element_id;
      }

      this._fileService.uploadFile(this.imageToUpload, this.modalService.type, element_id)
          .subscribe({
            next: () => {
              this.modalService.closeModal();
              this.imageToShow = undefined;
              this.imageToUpload = undefined;
              this.modalService.imageUpdatedEvent.emit();
            },error: (error) => {
              console.log(error);
              this._catchError.scaleError('Something went wrong on uploadFile', error);
            }, complete: () => Swal.close()
          });

    }
  }

}
