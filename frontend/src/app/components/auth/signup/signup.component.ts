import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  onSignup(): void {
    if (this.email && this.password && this.name) {
      this.snackBar.open('Inscription réussie !', 'Fermer', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });

      // Redirection vers la page de connexion après un court délai
      setTimeout(() => this.router.navigate(['/login']), 1000);
    } else {
      this.snackBar.open('Veuillez remplir tous les champs.', 'Fermer', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  }
}
