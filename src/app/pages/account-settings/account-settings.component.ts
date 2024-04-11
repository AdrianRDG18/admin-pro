import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit{

  //Refs DOM
  public theme = document.querySelector('#theme-id') as HTMLLinkElement;
  public theme_links = document.getElementsByClassName('selector');


  ngOnInit(): void {
    this.checkCurrentTheme();
  }

  changeTheme(new_theme: string) {
    localStorage.setItem('theme', new_theme);
    this.theme?.setAttribute('href', `./assets/css/colors/${new_theme}.css`)
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){

    var links_arr = Array.from(this.theme_links);

    links_arr.map(link_option =>{

      link_option.classList.remove('working');

      const btnTheme = link_option.getAttribute('data-theme')
      const currentTheme = this.theme.getAttribute('href');

      if(`./assets/css/colors/${btnTheme}.css` === currentTheme){
        link_option.classList.add('working');
      }
    });
  }

}
