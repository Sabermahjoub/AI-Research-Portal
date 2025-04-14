import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

//import { ListPublicationsComponent } from '../list-publications/list-publications.component';
import { Router, RouterModule } from '@angular/router';

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
export class HomeComponent implements OnInit {
  sideBarOpened: boolean = true; // Set to true to keep sidebar open by default
  activeItem: string = 'home';

  constructor(private router: Router) {}

  ngOnInit() {
    // Set active item based on current route
    const currentUrl = this.router.url;
    if (currentUrl.includes('/home/list')) {
      this.activeItem = 'home';
    } else if (currentUrl.includes('/home/my-account')) {
      this.activeItem = 'manage-accounts';
    } else {
      this.activeItem = 'home';
    }
  }
}
