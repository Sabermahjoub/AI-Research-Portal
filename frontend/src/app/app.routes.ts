import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListPublicationsComponent } from './components/list-publications/list-publications.component';

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
        // add more children as needed
      ]
    }

];
