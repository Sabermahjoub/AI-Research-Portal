import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

//import { ListPublicationsComponent } from '../list-publications/list-publications.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [MatSidenavModule,
     MatButtonModule,
     FormsModule,
     MatIconModule,
     NgClass,
     CommonModule,
     //ListPublicationsComponent,
     RouterModule
  ]
})
export class HomeComponent {
  sideBarOpened: boolean = false;
  activeItem: string = 'home';


}
