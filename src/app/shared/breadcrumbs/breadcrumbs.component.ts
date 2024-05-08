import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  title: string = '';
  titleSubs$: Subscription;

  constructor(private router: Router) {
    this.titleSubs$ = this.extractTitleRoute()
                          .subscribe( ({title}) => {
                            this.title = title;
                            document.title = `AdminPro - ${title}`;
                          });;
  }
  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }
  
  extractTitleRoute(){
    return this.router.events
      .pipe(
        filter( (event: any) => event instanceof ActivationEnd),
        filter( (event:ActivationEnd) => event.snapshot.firstChild === null ),
        map( (event: ActivationEnd) => event.snapshot.data)
      )
  }

}
