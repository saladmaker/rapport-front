import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { canActivateGroup } from './guards/auth-group.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [canActivateGroup],
        data: { groups: 'admin' }
    },
    {
        path: 'forbidden',
        component: ForbiddenComponent
    },
    { path: '**', component: NotFoundComponent }


];
