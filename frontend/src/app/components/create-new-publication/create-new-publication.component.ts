import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PublicationsService } from '../../services/publications.service';
import { DomainsService } from '../../services/domains.service';

export interface Publication {
  title: string;
  description: string;
  domains: String[];
  content: File | null;
}

@Component({
  selector: 'app-publication-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './create-new-publication.component.html',
  styleUrl: './create-new-publication.component.scss'
})
export class CreateNewPublicationComponent implements OnInit {
  domainNames : String[] = [];
  selectedDomainNames : any[] = [] ;
  publicationForm: FormGroup;
  selectedFile: File | null = null;
  isDragging = false;
  fileError = false;
  fileErrorMessage = '';
  //keywords: string[] = ['research', 'science'];
  isSubmitting = false;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private fb: FormBuilder ,
    private dialogRef: MatDialogRef<CreateNewPublicationComponent>,
    private publicationsService : PublicationsService,
    private domainsService : DomainsService
  ){
    this.publicationForm = this.fb.group({
      title: ['', [Validators.required]],
      domains: [[], [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      publicationDate : [new Date().toISOString().split('T')[0], Validators.required],
      accepted : [false, Validators.required]
    });
  }

  ngOnInit() {
    this.domainsService.getAllDomains().subscribe(domainNames => {
      this.domainNames = domainNames;
    });
  }

  onDomainSelect(event: Event): void {
    const selectedDomain = (event.target as HTMLSelectElement).value;
    if (!this.selectedDomainNames.some(item => item.domainName === selectedDomain)) {
      this.selectedDomainNames.push({ domainName: selectedDomain });
      this.publicationForm.get('domains')?.setValue(this.selectedDomainNames);
    }
  }
  
  removeDomain(domainToRemove: String): void {
    this.selectedDomainNames = this.selectedDomainNames.filter(domain => domain.domainName !== domainToRemove);
    this.publicationForm.get('domains')?.setValue(this.selectedDomainNames);
  }

  onSubmit() {
    if (this.publicationForm.valid && this.selectedFile) {
      // Show loading state
      this.isSubmitting = true;
      
      // The domains should already be in the correct format in the form
      // due to our updates to onDomainSelect and removeDomain
      console.log(this.publicationForm.value);
      
      // Now you can proceed with your submission logic
      // For example:
      // this.publicationsService.createPublication(this.publicationForm.value, this.selectedFile)
      //   .subscribe(
      //     response => {
      //       this.isSubmitting = false;
      //       this.dialogRef.close(response);
      //     },
      //     error => {
      //       this.isSubmitting = false;
      //       // Handle error
      //     }
      //   );
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.publicationForm.controls).forEach(key => {
        const control = this.publicationForm.get(key);
        control?.markAsTouched();
      });
      
      if (!this.selectedFile) {
        this.fileError = true;
        this.fileErrorMessage = 'Please upload a PDF file';
      }
    }
  }


  // Form progress calculation for progress bar
  getFormProgress(): number {
    const controls = this.publicationForm.controls;
    const totalControls = Object.keys(controls).length + 1; // +1 for file upload
    let filledControls = 0;
    
    for (const key in controls) {
      if (controls[key].valid && controls[key].value) {
        filledControls++;
      }
    }
    
    if (this.selectedFile) {
      filledControls++;
    }
    
    return Math.round((filledControls / totalControls) * 100);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.validateAndSetFile(file);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.validateAndSetFile(file);
    }
  }

  validateAndSetFile(file: File) {
    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      this.fileError = true;
      this.fileErrorMessage = 'Please upload a PDF file';
      this.selectedFile = null;
      return;
    }
    
    // Check file size (10MB max)
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeInBytes) {
      this.fileError = true;
      this.fileErrorMessage = 'File size exceeds 10MB limit';
      this.selectedFile = null;
      return;
    }
    
    this.fileError = false;
    this.selectedFile = file;
  }

  removeFile() {
    this.selectedFile = null;
    this.fileError = false;
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // addKeyword(keyword: string) {
  //   keyword = keyword.trim();
  //   if (keyword && !this.keywords.includes(keyword) && this.keywords.length < 5) {
  //     this.keywords.push(keyword);
  //   }
  // }

  // removeKeyword(keyword: string) {
  //   this.keywords = this.keywords.filter(k => k !== keyword);
  // }

  addCoAuthor() {
    console.log('Add co-author clicked');
  }



  closeForm() {
    this.dialogRef.close();
  }
}