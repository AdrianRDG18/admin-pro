import { Pipe, PipeTransform } from '@angular/core';
import { FileService } from '../services/file.service';
import { map, of } from 'rxjs';

@Pipe({
  name: 'getImage'
})
export class GetImagePipe implements PipeTransform {

  constructor(private _fileService: FileService){}

  transform(element: any, type: 'users' | 'medics' | 'hospitals'): any {

    if(type === 'users'){
      if(element.google){
        const numbers$ = of(element.image);
        return numbers$.pipe(
          map( resp => {
            return resp;
          })
        );
      };
    };
    return this.getImageFromAPI(element.image, type);
  }

  getImageFromAPI(image: string, type: 'users' | 'medics' | 'hospitals'){
    return this._fileService.getImageAPI(image, type)
    .pipe(
      map( resp => {
        return resp;
      })
    );
  }

}
