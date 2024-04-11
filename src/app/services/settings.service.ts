import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //Refs DOM
  private theme = document.querySelector('#theme-id') as HTMLLIElement;

  constructor() {
    this.setTheme();
  }

  /**
  * Set theme first time | set theme by definition in localStorage
  *
  * @returns void
  */
  setTheme(){
    const theme_default = localStorage.getItem('theme') || 'default-dark';
    this.theme?.setAttribute('href', `./assets/css/colors/${theme_default}.css`)
  }

  /**
  * Change theme by selected theme
  *
  * @param selected_theme
  * @param theme_options
  * @returns void
  */
  changeTheme(selected_theme: string, theme_options: Array<Element>) {
    localStorage.setItem('theme', selected_theme);
    this.theme?.setAttribute('href', `./assets/css/colors/${selected_theme}.css`);
    this.replaceIconBySelectedTheme(theme_options);
  }

  /**
   * 
   * Set/change icon(✓) of selected theme
   * 
   * @param theme_options 
   * @returns void
   */
  replaceIconBySelectedTheme(theme_options: Array<Element>){

    theme_options.map(theme_option =>{

      theme_option.classList.remove('working');

      const configured_theme = theme_option.getAttribute('data-theme')
      const current_theme = this.theme.getAttribute('href');

      if(`./assets/css/colors/${configured_theme}.css` === current_theme){
        theme_option.classList.add('working');
      }
    });
  }

}
