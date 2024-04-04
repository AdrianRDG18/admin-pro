import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  progress1: number = 10;
  progress2: number = 30;

  //This is for defining the value of the progress bar with percentage value
  get getProgress1(){
    return `${this.progress1}%`;
  }

  get getProgress2(){
    return `${this.progress2}%`;
  }

}
