import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListPublicationsComponent } from './components/list-publications/list-publications.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyPublicationsComponent } from './components/my-publications/my-publications.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { PendingPublicationsComponent } from './components/pending-publications/pending-publications.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'CoreAI', pathMatch: 'full' },

    // Login & Sign Up Routes (public)
    { path: 'CoreAI', component: LandingPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    // Home routes - split into public and protected
    {
      path: 'home',
      component: HomeComponent,
      children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', component: ListPublicationsComponent }, // Public route
        { path: 'pending-publications', component: PendingPublicationsComponent }, // Public route
        {
          path: 'my-account',
          component: MyAccountComponent,
          canActivate: [AuthGuard] // Protected route
        },
        {
          path: 'my-publications',
          component: MyPublicationsComponent,
          canActivate: [AuthGuard] // Protected route
        }
      ]
    },

    // Redirect any unknown paths to login
    { path: '**', redirectTo: '/login' }
];
