import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PublicationsService, Publication } from '../../services/publications.service';

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

  publications : Publication[] = [];

  constructor(private publicationService : PublicationsService) {}

  ngOnInit() {
    this.publicationService.getAllPublications().subscribe({
      next: (data) => {
        console.log(data);
        this.publications = data;
      },
      error: (err) => {
        console.error('Error fetching publications:', err);
      }
    });
  }


}
