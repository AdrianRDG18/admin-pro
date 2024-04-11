import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit{

  //Refs DOM
  public theme_options = document.getElementsByClassName('selector');
  public theme_options_arr: Array<Element> = [];

  constructor(private _settingsService: SettingsService) {}

  ngOnInit(): void {
    this.theme_options_arr = Array.from(this.theme_options);
    this._settingsService.replaceIconBySelectedTheme(this.theme_options_arr);
  }

  changeTheme(selected_theme: string) {
    this._settingsService.changeTheme(selected_theme, this.theme_options_arr);
  }

}
