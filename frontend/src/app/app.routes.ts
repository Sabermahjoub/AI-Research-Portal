import { AuthGuard } from './guards/auth.guard';
import { PendingPublicationsComponent } from './components/pending-publications/pending-publications.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component'; 

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
        },
      ]
    },

    // Redirect any unknown paths to login
    { path: '**', redirectTo: '/login' }
];
