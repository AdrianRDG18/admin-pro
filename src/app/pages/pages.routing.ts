import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { authGuard, canMatch } from '../guards/auth.guard';

const routes: Routes = [
    { 
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ authGuard ],
        canMatch: [ canMatch ],
        loadChildren: () => import('./child-routes.module').then(module => module.ChildRoutesModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
