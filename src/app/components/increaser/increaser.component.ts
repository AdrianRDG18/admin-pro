import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: [
  ]
})
export class IncreaserComponent {

  //If you need a diferent name for the external variable definition, you can use the @Input('external_name')
  // @Input('progress_input') progress: number = 50;
  @Input() progress: number = 50;

  changeProgress(number: number){

    if(this.progress >= 100 && number > 0){
      return this.progress = 100;
    } else if(this.progress <= 0 && number <0 ){
      return this.progress = 0;
    }
    return this.progress = this.progress + number;
  }

}
