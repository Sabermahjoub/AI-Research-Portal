import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { PendingPublicationsService } from '../../services/pending-publications.service';
import { Publication } from '../../services/publications.service';
import { UserService } from '../../services/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './pending-publications.component.html',
  styleUrl: './pending-publications.component.scss'
})
export class PendingPublicationsComponent implements OnInit {
  pending_publications: Publication[] = [];

  constructor(
    private publicationService: PendingPublicationsService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadPendingPublications();
  }

  loadPendingPublications() {
    this.publicationService.getAllPendingPublications().subscribe({
      next: (data) => {
        this.pending_publications = data;
      },
      error: (err) => {
        console.error('Error fetching pending publications:', err);
        this.showSnackBar('Failed to load pending publications', 'error');
      }
    });
  }

  updatePublication(publication: Publication, status : boolean, event: Event) {
    event.stopPropagation();
    
    if (!publication) {
      console.error('Publication object is undefined or null');
      return;
    }
    let dialogRef;
    if (status == true) {
    
      dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        data: {
          title: 'Confirm Publication Validation',
          message: `Are you sure you want to validate "${publication.title}"?`,
          confirmText: 'Validate',
          cancelText: 'Cancel'
        }
      });
    }
    else {
    
      dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        data: {
          title: 'Confirm Rejecting Validation',
          message: `Are you sure you want to reject "${publication.title}"?`,
          confirmText: 'Reject',
          cancelText: 'Cancel'
        }
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.processValidation(publication,status);
      }
    });
  }

  private processValidation(publication: Publication, status : boolean) {
    try {
      publication.accepted = status;
      
      const currentUser = localStorage.getItem("currentUser");
      let userObject;
      
      try {
        userObject = JSON.parse(currentUser || '');
      } catch (e) {
        userObject = { username: currentUser };
      }
      
      publication.admin = userObject;
      
      this.publicationService.updatePublication(publication).subscribe({
        next: (data) => {
          console.log("VALIDATED Publication ", data);
          this.showSnackBar('Publication validated successfully', 'success');
          // Remove the publication from the list or refresh the list
          this.pending_publications = this.pending_publications.filter(pub => pub.id !== publication.id);
        },
        error: (err) => {
          console.error('Error validating pending publications:', err);
          this.showSnackBar('Failed to validate publication', 'error');
        }
      });
    } catch (error) {
      console.error('Error in processValidation:', error);
      this.showSnackBar('An error occurred during validation', 'error');
    }
  }

  rejectPublication(publication: Publication, event: Event) {
    event.stopPropagation();
    
    if (!publication) {
      console.error('Publication object is undefined or null');
      return;
    }
    
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Publication Rejection',
        message: `Are you sure you want to reject "${publication.title}"?`,
        confirmText: 'Reject',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          console.log("REJECTING PUBLICATION!", publication);
          // Implement rejection logic here
          this.showSnackBar('Publication rejected', 'info');
          // Remove the publication from the list or refresh the list
          this.pending_publications = this.pending_publications.filter(pub => pub.id !== publication.id);
        } catch (error) {
          console.error('Error in rejectPublication:', error);
          this.showSnackBar('Failed to reject publication', 'error');
        }
      }
    });
  }

  private showSnackBar(message: string, type: 'success' | 'error' | 'info') {
    const classMap = {
      success: 'snackbar-success',
      error: 'snackbar-error',
      info: 'snackbar-info'
    };
    
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: [classMap[type]]
    });
  }
}