import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';

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
  email: string = '';
  password: string = '';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  onLogin(): void {
    if (this.email === 'admin@coreai.com' && this.password === 'admin') {
      this.router.navigate(['/home/list']);
    } else {
      this.snackBar.open('Identifiants invalides. Veuillez réessayer.', 'Fermer', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  }
}
