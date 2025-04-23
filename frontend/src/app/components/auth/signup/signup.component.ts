import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  address: string = '';
  workAddress: string = '';
  jobTitle: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  onSignup(): void {
    if (this.email && this.password && this.firstName && this.lastName && this.username) {
      this.isLoading = true;

      // Create chercheur object
      const chercheur = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        username: this.username,
        password: this.password,
        address: this.address || '',
        workAddress: this.workAddress || '',
        jobTitle: this.jobTitle || '',
        role: 'CHERCHEUR'  // Default role
      };
console.log("helo");
      // Call the register method from AuthService
      this.authService.register(chercheur).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.snackBar.open('Inscription réussie !', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });

          // Redirect to login page after a short delay
          setTimeout(() => this.router.navigate(['/login']), 1000);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open(error.message || 'Erreur lors de l\'inscription. Veuillez réessayer.', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    } else {
      this.snackBar.open('Veuillez remplir tous les champs.', 'Fermer', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  }
}
