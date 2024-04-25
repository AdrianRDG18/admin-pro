import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {


  ngOnInit(): void {
    this.getUsersPromise().then( ( resp ) =>{
      console.log(resp)
    });
  }

  getUsersPromise(){
    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json())
        .then( body => resolve( body.data ) )
    });
  }

}
