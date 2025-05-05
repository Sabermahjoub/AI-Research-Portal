import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateNewPublicationComponent } from '../create-new-publication/create-new-publication.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Publication } from '../../services/publications.service';

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
export class MyPublicationsComponent {

  searchQuery: string = '';
  publications: any[] = [
    {
      title: 'The power of NLP in medicine',
      category: 'AI',
      description: 'Lorem ipsum dolor sit amet. Eos veniam totam non voluptatum laboriosam ut optio molestiae. Ea iure laboriosam eos repellendus earum et ipsam tenetur in optio magnam et soluta magni ut consectetur illum et quod aperiam.',
      author: 'Saber Mahjoub',
      date: '03/01/2025',
      likes: 23,
      comments: 5
    },
    {
      title: 'Machine Learning Applications',
      category: 'ML',
      description: 'A comprehensive study on how machine learning is transforming various industries with practical examples and case studies.',
      author: 'Saber Mahjoub',
      date: '02/15/2025',
      likes: 18,
      comments: 3
    },
    {
      title: 'Deep Learning Fundamentals',
      category: 'AI',
      description: 'An in-depth guide to understanding the core concepts of deep learning and neural networks with practical implementations.',
      author: 'Saber Mahjoub',
      date: '01/20/2025',
      likes: 15,
      comments: 7
    },
    {
      title: 'Medical Data Analysis',
      category: 'Medicine',
      description: 'Exploring how big data analytics is revolutionizing medical diagnosis and treatment planning in modern healthcare systems.',
      author: 'Saber Mahjoub',
      date: '12/05/2024',
      likes: 31,
      comments: 12
    }
  ];

  constructor(private dialog: MatDialog) {}

  openAddPublicationDialog(): void {
    const dialogRef = this.dialog.open(CreateNewPublicationComponent, {
      width: '600px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result: Publication) => {
      if (result) {
        // Add the new publication to the list with default values for display
        this.publications.unshift({
          ...result,
          author: 'Saber Mahjoub',
          date: this.formatCurrentDate(),
          likes: 0,
          comments: 0
        });
      }
    });
  }

  deletePublication(publication: any): void {
    const index = this.publications.indexOf(publication);
    if (index !== -1) {
      this.publications.splice(index, 1);
    }
  }

  private formatCurrentDate(): string {
    const date = new Date();
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  }

}
