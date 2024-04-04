import { Component } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: [
  ]
})
export class IncreaserComponent {

  progress: number = 50;

  get getProgress() {
    return `${this.progress}%`;
  }

  changeProgress(number: number){

    if(this.progress >= 100 && number > 0){
      return this.progress = 100;
    } else if(this.progress <= 0 && number <0 ){
      return this.progress = 0;
    }
    return this.progress = this.progress + number;
  }
  
}
