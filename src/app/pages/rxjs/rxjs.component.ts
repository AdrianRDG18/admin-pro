import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {
    
    const obs$ = new Observable( observer =>{
      let i = -1;
      const interval = setInterval( () => {
        i++;
        observer.next(i);
        if(i === 4){
          clearInterval(interval);
          observer.complete();
        }
      }, 1000)
    });

    obs$.subscribe( 
        valor => console.log('Subs', valor),
        (error) => console.error("Error: ", error),
        () => console.info('El observador termino')
    );

  }

}
