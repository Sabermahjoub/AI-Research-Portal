import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListPublicationsComponent } from './components/list-publications/list-publications.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyPublicationsComponent } from './components/my-publications/my-publications.component';

import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { PendingPublicationsComponent } from './components/pending-publications/pending-publications.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component'; 

export const routes: Routes = [
    // {   path : '',
    //     component : HomeComponent,
    //     children: [
    //         { path: 'publications', component: ListPublicationsComponent }
    //     ]
    // },
    // { path : 'publications', component : ListPublicationsComponent}
    { path: '', redirectTo: 'CoreAI', pathMatch: 'full' },

    // Login & Sign Up Routes 
    { path: 'CoreAI', component: LandingPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    {
      path: 'home',
      component: HomeComponent,
      children: [
        { path: 'list', component: ListPublicationsComponent },
        { path: 'pending-publications', component: PendingPublicationsComponent }

      ]
    }

];
