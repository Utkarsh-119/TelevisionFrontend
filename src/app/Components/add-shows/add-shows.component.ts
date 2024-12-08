import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-shows',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template:  `
  <h2>Add Show</h2>

    <form #showForm="ngForm" (ngSubmit)="onSubmit(showForm)">
      <mat-form-field appearance="outline">
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="show.title" name="title" required #title="ngModel" placeholder="Enter Show Title" />
        <mat-error *ngIf="title.invalid && title.touched">Title is required</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Genre</mat-label>
        <input matInput [(ngModel)]="show.genre" name="genre" required #genre="ngModel" placeholder="Enter Genre" />
        <mat-error *ngIf="genre.invalid && genre.touched">Genre is required</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Duration (HH:MM:SS)</mat-label>
        <input matInput [(ngModel)]="show.duration" name="duration" required #duration="ngModel" placeholder="Enter Duration" />
        <mat-error *ngIf="duration.invalid && duration.touched">Duration is required</mat-error>
      </mat-form-field>

      <button mat-raised-button color="primary" [disabled]="showForm.invalid" type="submit">Add Show</button>
    </form>
`,
  styles: [`
    h2 {
      margin-bottom: 16px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  `]
})
export class AddShowsComponent {
  show = {
    title: '',
    genre: '',
    duration: '',
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  onSubmit(showForm: any): void {
    if (showForm.valid) {
      const apiUrl = 'https://localhost:7166/api/Shows';

      // Create the object to be sent to the API
      const showData = {
        title: this.show.title,
        genre: this.show.genre,
        duration: this.show.duration,
      };

      // Call the API using HTTP POST
      this.http.post(apiUrl, showData).subscribe({
        next: (response) => {
          console.log('Show added successfully:', response);
           this.showSuccessMessage('Show added successfully!');
          showForm.reset(); // Reset the form after successful submission
        },
        error: (error) => {
          console.error('Error adding show:', error);
          this.showErrorMessage('Failed to add the show. Please try again.');
        },
      });
    }
  }
  showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['snackbar-success']
    });
  }

  // Show error message
  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['snackbar-error']
    });
  }
}
