import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    { 
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ authGuard ],
        children: [
            //This is the first child component that it will show when the path will be only "/dashboard" (So it will show the DashboardComponent)
            //If you want show other compoment, then you have to put the name of the component, something like this: { path: '', component: MyPeferedComponent },
            { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
            //These are the child components with specific path
            { path: 'progress', component: ProgressComponent, data: { title: 'Progressbar' } },
            { path: 'graph-1', component: Graph1Component, data: { title: 'Graficas' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes del Tema' } },
            { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
            { path: 'profile', component: ProfileComponent, data: { title: 'User profile'} }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
