import { Component } from '@angular/core';
import { Observable, retry } from 'rxjs';

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
        //Emit correct value
        observer.next(i);

        if(i === 4){
          clearInterval(interval);
          //Emit oberver finished
          observer.complete();
        }
        if(i === 2){
          console.error("Failed");
          //Emit error value
          observer.error("I is 2");
        }

      }, 1000);

    });

    obs$.pipe(
      retry(1)
      // retryWhen(1) https://rxjs.dev/api/operators/retryWhen
    )
    .subscribe( 
        valor => console.log('Subs', valor),
        (error) => console.error("Error: ", error),
        () => console.info('The oberver finished')
    );

  }

}
