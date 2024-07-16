import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'Progressbar', url: 'progress' },
        { title: 'Graphs', url: 'graph-1' },
        { title: 'Promises', url: 'promises' },
        { title: 'RXJS', url: 'rxjs' },
      ]
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Users', url: 'users' },
        { title: 'Medics', url: 'medics' },
        { title: 'Hospitals', url: 'hospitals' },
      ]
    },
  ]

  constructor() { }

}
