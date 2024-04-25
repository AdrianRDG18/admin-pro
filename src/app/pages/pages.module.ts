import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modules
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
//This module is important when you use <router-outlet></router-outlet>
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

//Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    ComponentsModule
  ]
})
export class PagesModule { }
