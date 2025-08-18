import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { canActivateGroup } from './guards/auth-group.guard';

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
    }
];
