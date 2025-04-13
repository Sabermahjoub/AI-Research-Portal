import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { NgFor } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-list-publications',
  standalone : true,
  imports: [MatCardModule,
      NgFor,
      MatInputModule,
      MatFormFieldModule,
      FormsModule
  ],
  templateUrl: './list-publications.component.html',
  styleUrl: './list-publications.component.scss'
})
export class ListPublicationsComponent {
  items = [1,2,3,4];
  items1 = [1,2];

}
