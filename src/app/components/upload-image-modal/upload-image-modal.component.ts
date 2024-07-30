import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CatchErrorService } from 'src/app/services/catch-error.service';
import { FileService } from 'src/app/services/file.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
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

  constructor(public uploadImageService: UploadImageService,
              private _fileService: FileService,
              private _swal: AlertService,
              private _catchError: CatchErrorService
  ){}

  closeModal(){
    this.uploadImageService.closeModal();
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

      if(this.uploadImageService.type === 'users'){
        if(this.uploadImageService.user?.uid){
          element_id = this.uploadImageService.user.uid;
        }
      }else{
        element_id = this.uploadImageService.element_id;
      }

      this._fileService.uploadFile(this.imageToUpload, this.uploadImageService.type, element_id)
          .subscribe({
            next: () => {
              this.uploadImageService.closeModal();
              this.imageToShow = undefined;
              this.imageToUpload = undefined;
              this.uploadImageService.imageUpdatedEvent.emit();
            },error: (error) => {
              console.log(error);
              this._catchError.scaleError('Something went wrong on uploadFile', error);
            }, complete: () => Swal.close()
          });

    }
  }

}
