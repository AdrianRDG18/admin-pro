import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: [
  ]
})
export class IncreaserComponent {

  //With external variable name
  @Input('value') progress_value: number = 50; //@Input for recive the value from the father component
  @Output('value') progress_output: EventEmitter<number> = new EventEmitter(); //@Output for emit event(send value)to the father component

  //Without external variable name
  @Input() type_button: string = 'btn-primary';

  /**
   * 
   */
  changeProgress(number: number){

    if(this.progress_value >= 100 && number > 0){

      this.progress_output.emit(100);
      return this.progress_value = 100;

    } else if(this.progress_value <= 0 && number <0 ){

      this.progress_output.emit(0);
      return this.progress_value = 0;
    }

    this.progress_value = this.progress_value + number;
    this.progress_output.emit(this.progress_value);
    return  this.progress_value;

  }

  /**
   * 
   */
  changeProgresseByWritte(value: number){
    if(value >= 100){
      this.progress_value = 100;
    }else if(value <= 0){
      this.progress_value = 0;
    }else{
      this.progress_value = value;
    }
    this.progress_output.emit(this.progress_value);
  }

}
