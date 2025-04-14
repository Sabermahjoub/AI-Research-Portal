import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-publications',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './list-publications.component.html',
  styleUrl: './list-publications.component.scss'
})
export class ListPublicationsComponent {
  // Publications will be loaded from a service in the future
}
