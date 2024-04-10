import { Component } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent {

  public theme = document.querySelector('#theme-id');

  changeTheme(new_theme: string) {
    localStorage.setItem('theme', new_theme);
    this.theme?.setAttribute('href', `./assets/css/colors/${new_theme}.css`)
  }

}
