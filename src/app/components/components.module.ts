import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaserComponent } from './increaser/increaser.component';
import { UploadImageModalComponent } from './upload-image-modal/upload-image-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IncreaserComponent,
    UploadImageModalComponent
  ],
  exports: [
    IncreaserComponent,
    UploadImageModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ComponentsModule { }
