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

        // Check if the user is a Chercheur (has firstName, lastName, etc.)
        if (user.firstName !== undefined) {
          // User is a Chercheur
          this.userData = {
            id: user.id,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            username: user.username || '',
            address: user.address || '',
            workAddress: user.workAddress || '',
            jobTitle: user.jobTitle || '',
            about: user.about || '',
            role: user.role
          };
        } else {
          // User is not a Chercheur, might be a regular User
          this.userData = {
            id: user.id,
            username: user.username || '',
            role: user.role,
            // Set default values for Chercheur fields
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            workAddress: '',
            jobTitle: '',
            about: ''
          };
        }

        // Update the stored user info with additional details
        const updatedUserInfo = {
          ...currentUser,
          ...this.userData
        };

        // Store updated user info in localStorage
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(updatedUserInfo));
        }

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

    // Make a copy of the userData to avoid modifying the original
    const userDataToUpdate = { ...this.userData };

    // Make sure we have the user ID
    if (!userDataToUpdate.id) {
      const token = this.authService.getToken();
      if (token) {
        try {
          // Try to extract user ID from JWT token
          const tokenParts = token.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            if (payload.UserId) {
              userDataToUpdate.id = payload.UserId;
            }
          }
        } catch (e) {
          console.error('Error parsing JWT token:', e);
        }
      }
    }

    console.log('Updating profile with data:', userDataToUpdate);

    this.userService.updateUser(userDataToUpdate).subscribe({
      next: (response) => {
        console.log('Profile updated successfully:', response);
        this.snackBar.open('Profile updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });

        // Reload user data to get the updated information
        this.loadUserData();

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

    // Try to extract user ID from JWT token
    let userId = null;
    const token = this.authService.getToken();
    if (token) {
      try {
        const tokenParts = token.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          if (payload.UserId) {
            userId = payload.UserId;
          }
        }
      } catch (e) {
        console.error('Error parsing JWT token:', e);
      }
    }

    this.userData = {
      id: userId || 1,
      firstName: 'User',
      lastName: 'Account',
      email: `${username}@example.com`,
      username: username,
      address: 'Tunis, Tunisia',
      workAddress: 'Research Center, Tunis',
      jobTitle: 'Researcher',
      about: 'AI researcher specializing in natural language processing and machine learning.',
      role: 'CHERCHEUR'
    };

    // Update the stored user info with additional details
    const updatedUserInfo = {
      ...currentUser,
      ...this.userData
    };

    // Store updated user info in localStorage
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(updatedUserInfo));
    }
  }
}
