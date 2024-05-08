import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  intervalSubs: Subscription;

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
    this.intervalSubs = this.observableRXJS()
        .subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
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
    return interval(100)
            .pipe( 
              // take(10),
              map( value => value + 1),
              filter( value => ( value % 2 === 0 ? true: false ) )
            )
  }


}
