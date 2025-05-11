import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateNewPublicationComponent } from '../create-new-publication/create-new-publication.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Publication, PublicationsService } from '../../services/publications.service';

@Component({
  selector: 'app-my-publications',
  standalone : true,
  imports: [MatCardModule,
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './my-publications.component.html',
  styleUrl: './my-publications.component.scss'
})
export class MyPublicationsComponent implements OnInit {

  searchQuery: string = '';
  publications: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  username: string | null = null;
  hasPublications: boolean = false;

  constructor(
    private dialog: MatDialog,
    private publicationsService: PublicationsService
  ) {}

  ngOnInit(): void {
    this.loadUserPublications();
  }

  loadUserPublications(): void {
    this.loading = true;
    this.error = null;

    // Get username from localStorage
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      try {
        const currentUser = JSON.parse(currentUserStr);
        this.username = currentUser.username;
      } catch (e) {
        console.error('Error parsing currentUser from localStorage', e);
      }
    }

    if (!this.username) {
      console.error('No username found in localStorage');
      this.error = 'User not authenticated';
      this.loading = false;
      this.hasPublications = false;
      return;
    }

    this.publicationsService.getPublicationsByChercheur(this.username).subscribe({
      next: (publications) => {
        if (publications && publications.length > 0) {
          // Transform the data to match the template format
          this.publications = publications.map(pub => ({
            id: pub.id,
            title: pub.title,
            description: pub.description,
            category: pub.domains && pub.domains.length > 0 ? pub.domains[0].domainName : 'General',
            author: pub.team && pub.team.length > 0 ? pub.team[0].username : this.username,
            date: this.formatDate(pub.publicationDate),
            likes: 0, // These fields are not in the API response, using defaults
            comments: pub.commentaires ? pub.commentaires.length : 0
          }));
          this.hasPublications = true;
        } else {
          // If no publications found, set empty array
          this.publications = [];
          this.hasPublications = false;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading publications:', err);
        this.error = 'Failed to load publications';
        this.loading = false;
        this.publications = [];
        this.hasPublications = false;
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return this.formatCurrentDate();

    try {
      const date = new Date(dateString);
      return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
    } catch (e) {
      return this.formatCurrentDate();
    }
  }

  openAddPublicationDialog(): void {
    const dialogRef = this.dialog.open(CreateNewPublicationComponent, {
      width: '600px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result: Publication) => {
      if (result) {
        // Reload publications from server after adding a new one
        setTimeout(() => this.loadUserPublications(), 1000);
      }
    });
  }

  deletePublication(publication: any): void {
    const index = this.publications.indexOf(publication);
    if (index !== -1) {
      this.publications.splice(index, 1);
      // Here you would typically call a service method to delete from the backend
      // this.publicationsService.deletePublication(publication.id).subscribe(...)
    }
  }

  private formatCurrentDate(): string {
    const date = new Date();
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  }

  // Method to refresh publications
  refreshPublications(): void {
    this.loadUserPublications();
  }

}
