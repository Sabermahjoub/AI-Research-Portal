import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListPublicationsComponent } from './components/list-publications/list-publications.component';
import { MyAccountComponent } from './components/my-account/my-account.component';

export const routes: Routes = [
    // {   path : '',
    //     component : HomeComponent,
    //     children: [
    //         { path: 'publications', component: ListPublicationsComponent }
    //     ]
    // },
    // { path : 'publications', component : ListPublicationsComponent}
    { path: '', redirectTo: '/home/list', pathMatch: 'full' },
    {
      path: 'home',
      component: HomeComponent,
      children: [
        { path: 'list', component: ListPublicationsComponent },
        { path: 'my-account', component: MyAccountComponent },
        // add more children as needed
      ]
    }

];
