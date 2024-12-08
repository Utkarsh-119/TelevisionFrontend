import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-media',
  standalone: true,
  imports: [CommonModule,
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,],
  templateUrl: './add-media.component.html',
  styleUrl: './add-media.component.css'
})
export class AddMediaComponent {
  media = {
    fileName: '',
    type: '',
    tags: '',
  };

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  onSubmit(): void {
    // Prepare the request payload
    const payload = {
      fileName: this.media.fileName,
      type: this.media.type,
      uploadedDate: new Date().toISOString(),
      tags: this.media.tags,
    };

    // POST request to the API
    this.http.post('https://localhost:7166/api/Media', payload, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('API Response:', response);
          this.snackBar.open('Media uploaded successfully!', 'Close', {
            duration: 2000,
          });
          this.resetForm();
        },
        error: (error) => {
          console.error('API Error:', error);
          this.snackBar.open('Failed to upload media. Please try again.', 'Close', {
            duration: 2000,
          });
        },
      });
  }

  resetForm(): void {
    this.media = { fileName: '', type: '', tags: '' };
  }
}
