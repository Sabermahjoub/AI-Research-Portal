import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

//import { ListPublicationsComponent } from '../list-publications/list-publications.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { UserService } from '../../services/user.service';

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
  role : string = "";
  sideBarOpened: boolean = true; // Set to true to keep sidebar open by default
  activeItem: string = 'home';
  currentUser: any;
  isAuthenticated: boolean = false;

  constructor(private router: Router, private authService: AuthService, private userService : UserService) {
    // Get current user from auth service
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    // Get authentication status
    this.authService.isAuthenticated().subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

  ngOnInit() {

    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        console.log('User data loaded:', user);

        this.role = user.role;

        console.log("ROLE :",this.role);

        // if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        //   localStorage.setItem('currentUser', JSON.stringify(user));
        // }

      },
      error: (error) => {
        console.error('Error loading user data:', error);
      }
    });

    // Set active item based on current route
    const currentUrl = this.router.url;
    if (currentUrl.includes('/home/list')) {
      this.activeItem = 'home';
    } else if (currentUrl.includes('/home/my-account')) {
      this.activeItem = 'manage-accounts';
    } else if (currentUrl.includes('/home/my-publications')) {
      this.activeItem = 'my-publications';
    } else {
      this.activeItem = 'home';
    }
  }

  // Logout method
  logout() {
    this.authService.logout();
  }

  // Navigate to login page
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
