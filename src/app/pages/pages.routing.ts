import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent, 
        children: [
            //This is the first child component that it will show when the path will be only "/dashboard" (So it will show the DashboardComponent)
            //If you want show other compoment, then you have to put the name of the component, something like this: { path: '', component: MyPeferedComponent },
            { path: '', component: DashboardComponent },
            //These are the child components with specific path
            { path: 'progress', component: ProgressComponent },
            { path: 'graph-1', component: Graph1Component },
            { path: 'account-settings', component: AccountSettingsComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
