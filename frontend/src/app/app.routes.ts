import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListPublicationsComponent } from './components/list-publications/list-publications.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyPublicationsComponent } from './components/my-publications/my-publications.component';

import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

export const routes: Routes = [
    // {   path : '',
    //     component : HomeComponent,
    //     children: [
    //         { path: 'publications', component: ListPublicationsComponent }
    //     ]
    // },
    // { path : 'publications', component : ListPublicationsComponent}
    { path: '', redirectTo: '/home/list', pathMatch: 'full' },

    // Login & Sign Up Routes 
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    {
      path: 'home',
      component: HomeComponent,
      children: [
        { path: 'list', component: ListPublicationsComponent },
        { path: 'my-account', component: MyAccountComponent },
        { path: 'my-publications', component: MyPublicationsComponent },

      ]
    }

];
