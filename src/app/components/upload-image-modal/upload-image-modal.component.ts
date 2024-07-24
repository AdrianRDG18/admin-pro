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
  public imageToShow: any;

  constructor(public _uploadImageService: UploadImageService,
              private _fileService: FileService,
              private _swal: AlertService,
              private _catchError: CatchErrorService
  ){}

  closeModal(){
    this._uploadImageService.closeModal();
    this.imageToShow = undefined;
    this.imageToUpload = undefined;
  }

  setImage(event: any){

    if(event.target.files[0]){

      this.imageToUpload = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        this.imageToShow = reader.result}
      ;

    }else{
      this.imageToShow = undefined;
      this.imageToUpload = undefined;
    }
  }

  uploadFile(){
    if(this.imageToUpload !== undefined){
      this._swal.swalProcessingRequest();
      Swal.showLoading();
      this._fileService.uploadFile(this.imageToUpload, 'users', this._uploadImageService.user?.uid)
          .subscribe({
            next: () => {
              this._uploadImageService.closeModal();
              this.imageToShow = undefined;
              this.imageToUpload = undefined;
              this._uploadImageService.imageUpdated.emit();
            },error: (error) => {
              console.log(error);
              this._catchError.scaleError('Something went wrong on uploadFile', error);
            }, complete: () => Swal.close()
          });
    }
  }

}
