import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  onLogin(): void {
    console.log('Login attempt with username:', this.username);

    if (!this.username || !this.password) {
      this.snackBar.open('Veuillez remplir tous les champs.', 'Fermer', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    this.isLoading = true;

    // Use the authentication service to login
    this.authService.login(this.username, this.password).subscribe({
      next: (token) => {
        console.log('Login successful');
        this.isLoading = false;

        if (token && token !== 'Failure') {
          this.snackBar.open('Connexion réussie !', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });

          // Navigate to home page after successful login
          setTimeout(() => {
            this.router.navigate(['/home/list']);
          }, 500);
        } else {
          this.snackBar.open('Identifiants invalides. Veuillez réessayer.', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      },
      error: (error) => {
        console.error('Login error details:', error);
        this.isLoading = false;

        // Regular error handling
        this.snackBar.open(error.message || 'Erreur de connexion. Veuillez réessayer.', 'Fermer', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  /**
   * Continue as guest without authentication
   */
  continueAsGuest(): void {
    console.log('Continuing as guest');

    // Show a message to inform the user
    this.snackBar.open('Vous naviguez en tant qu\'invité. Certaines fonctionnalités seront limitées.', 'Compris', {
      duration: 5000,
      panelClass: ['snackbar-info']
    });

    // Navigate to the home page
    this.router.navigate(['/home/list']);
  }
}
