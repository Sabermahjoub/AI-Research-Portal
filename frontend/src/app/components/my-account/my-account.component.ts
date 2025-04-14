import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent {
  // This component is currently static
  // We'll add dynamic functionality when the backend is ready
}
