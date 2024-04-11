import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  
  constructor(private _sidebarService: SidebarService) { }
  
  get menu() {
    return this._sidebarService.menu;
  }
}
