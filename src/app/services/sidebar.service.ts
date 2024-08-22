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
        { title: 'Main', url: '/', role_requested: 'USER_ROLE' },
        { title: 'Progressbar', url: 'progress', role_requested: 'USER_ROLE' },
        { title: 'Graphs', url: 'graph-1', role_requested: 'USER_ROLE' },
        { title: 'Promises', url: 'promises', role_requested: 'USER_ROLE' },
        { title: 'RXJS', url: 'rxjs', role_requested: 'ADMIN_ROLE' },
      ],
      role_requested: 'USER_ROLE'
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Users', url: 'users', role_requested: 'ADMIN_ROLE' },
        { title: 'Medics', url: 'medics', role_requested: 'ADMIN_ROLE' },
        { title: 'Hospitals', url: 'hospitals', role_requested: 'ADMIN_ROLE' },
      ],
      role_requested: 'ADMIN_ROLE'
    },
  ]

  constructor() { }

}
