import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';
import { FileService } from '../services/file.service';
import { map, of } from 'rxjs';

@Pipe({
  name: 'transformImage'
})
export class TransformImagePipe implements PipeTransform {

  constructor(private _fileService: FileService){}

  transform(value: unknown, user: User): any {

    if(user.google){
      const numbers$ = of(user.image);
      return numbers$.pipe(
        map( resp => {
          return resp;
        })
      );
    }else{
      return this._fileService.getImageAPI(user.image)
                  .pipe(
                    map( resp => {
                      return resp;
                    })
                  );
    }
  }

}
