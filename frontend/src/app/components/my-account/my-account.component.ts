import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent implements OnInit {
  // User data
  userData: any = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    address: '',
    workAddress: '',
    jobTitle: '',
    about: ''
  };

  // Loading state
  isLoading: boolean = false;
  isUpdating: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  /**
   * Load user data from the API
   */
  loadUserData(): void {
    this.isLoading = true;

    // Get current user from auth service
    const currentUser = this.authService.currentUserValue;

    if (!currentUser) {
      this.snackBar.open('User not authenticated', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      this.isLoading = false;
      return;
    }

    // Get user details from API
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        console.log('User data loaded:', user);
        this.userData = {
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          username: user.username || '',
          address: user.address || '',
          workAddress: user.workAddress || '',
          jobTitle: user.jobTitle || '',
          about: user.about || ''
        };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        this.snackBar.open(error.message || 'Failed to load user data', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        this.isLoading = false;

        // For development - use mock data if API fails
        this.loadMockData();
      }
    });
  }

  /**
   * Update user profile
   */
  updateProfile(): void {
    this.isUpdating = true;

    this.userService.updateUser(this.userData).subscribe({
      next: (response) => {
        this.snackBar.open('Profile updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.isUpdating = false;
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.snackBar.open(error.message || 'Failed to update profile', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        this.isUpdating = false;
      }
    });
  }

  /**
   * Load mock data for development
   */
  private loadMockData(): void {
    // Get username from auth service
    const currentUser = this.authService.currentUserValue;
    const username = currentUser?.username || 'user';

    this.userData = {
      firstName: 'User',
      lastName: 'Account',
      email: `${username}@example.com`,
      username: username,
      address: 'Tunis, Tunisia',
      workAddress: 'Research Center, Tunis',
      jobTitle: 'Researcher',
      about: 'AI researcher specializing in natural language processing and machine learning.'
    };
  }
}
