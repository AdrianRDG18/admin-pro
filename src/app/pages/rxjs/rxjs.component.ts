import { Component } from '@angular/core';
import { Observable, retry, interval, take, map } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {
    //// First example
    // this.myFirstObservable().pipe(
    //   retry(1)
    //   // retryWhen(1) https://rxjs.dev/api/operators/retryWhen
    // )
    // .subscribe( 
    //     valor => console.log('Subs', valor),
    //     (error) => console.error("Error: ", error),
    //     () => console.info('The oberver finished')
    // );

    // Second example
    this.observableRXJS()
        .subscribe(console.log);

  }

  myFirstObservable(): Observable<number> {
    
    return new Observable<number>( observer =>{
      
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

  }

  observableRXJS(): Observable<number> {
    return interval(1000)
            .pipe( 
              take(4),
              map( value => {
                return value + 1
              })
            )
  }


}
