import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { PendingPublicationsService } from '../../services/pending-publications.service';
import { Publication } from '../../services/publications.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-pending-publications',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './pending-publications.component.html',
  styleUrl: './pending-publications.component.scss'
})
export class PendingPublicationsComponent {

  pending_publications: Publication[] = [];
  
  constructor(private publicationService: PendingPublicationsService,
              private userService : UserService
  ) {}
  
  ngOnInit() {
    this.publicationService.getAllPendingPublications().subscribe({
      next: (data) => {
        this.pending_publications = data;
      },
      error: (err) => {
        console.error('Error fetching pending publications:', err);
      }
    });
  }

  validatePublication(publication: Publication, event: Event) {
    event.stopPropagation();

    if (!publication) {
      console.error('Publication object is undefined or null');
      return;
    }
    
    try {
      publication.accepted = true;

      console.log("VALIDATING PUBLICATION!", publication);
      // this.publicationService.updatePublication(publication).subscribe({
      //   next: (data) => {
      //     console.log("VALIDATE Publication ", data);
      //   },
      //   error: (err) => {
      //     console.error('Error fetching pending publications:', err);
      //   }
      // });
    } catch (error) {
      console.error('Error in validatePublication:', error);
    }
  }

  rejectPublication(publication: Publication, event: Event) {
    event.stopPropagation();
    
    if (!publication) {
      console.error('Publication object is undefined or null');
      return;
    }
    
    try {
      console.log("REJECTING PUBLICATION!", publication);
      // Additional rejection logic here
    } catch (error) {
      console.error('Error in rejectPublication:', error);
    }
  }
}