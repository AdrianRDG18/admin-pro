import { Pipe, PipeTransform } from '@angular/core';
import { FileService } from '../services/file.service';
import { map, of } from 'rxjs';

@Pipe({
  name: 'getImage'
})
export class GetImagePipe implements PipeTransform {

  constructor(private _fileService: FileService){}

  transform(element: any, type: string): any {

    if(type === 'user'){
      if(element.google){
        const numbers$ = of(element.image);
        return numbers$.pipe(
          map( resp => {
            return resp;
          })
        );
      };
    };
    return this.getImageFromAPI(element.image);
  }

  getImageFromAPI(image: string){
    return this._fileService.getImageAPI(image)
    .pipe(
      map( resp => {
        return resp;
      })
    );
  }

}
