import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { UsersComponent } from './maintenance/users/users.component';
import { MedicComponent } from './maintenance/medics/medic/medic.component';
import { MedicsComponent } from './maintenance/medics/medics.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { adminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  //This is the first child component that it will show when the path will be only "/dashboard" (So it will show the DashboardComponent)
  //If you want show other compoment, then you have to put the name of the component, something like this: { path: '', component: MyPeferedComponent },
  { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
  //These are the child components with specific path
  { path: 'progress', component: ProgressComponent, data: { title: 'Progressbar' } },
  { path: 'graph-1', component: Graph1Component, data: { title: 'Graficas' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes del Tema' } },
  { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'User profile'} },
  { path: 'search/:term', component: SearchComponent, data: { title: 'Search by Term'}},
  // Maintenance
  { path: 'users', component: UsersComponent, data: { title: 'Users maintenance'}, canActivate: [adminGuard]},
  { path: 'medics', component: MedicsComponent, data: { title: 'Medics maintenance'}, canActivate: [adminGuard]},
  { path: 'medic/:id', component: MedicComponent, data: { title: 'Medic edition' }, canActivate: [adminGuard]},
  { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals maintenance'}, canActivate: [adminGuard]}
]


@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
