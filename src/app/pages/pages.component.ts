import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit{

  public theme = document.querySelector('#theme-id');

  ngOnInit(): void {
    const theme_default = localStorage.getItem('theme') || 'default-dark';
    this.theme?.setAttribute('href', `./assets/css/colors/${theme_default}.css`)
  }

}
