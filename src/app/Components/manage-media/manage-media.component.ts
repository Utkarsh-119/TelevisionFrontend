import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-manage-media',
  standalone: true,
  imports: [  CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,],
  templateUrl: './manage-media.component.html',
  styleUrl: './manage-media.component.css'
})
export class ManageMediaComponent implements OnInit{
  mediaLibrary: any[] = [];
  displayedColumns: string[] = ['mediaId', 'fileName', 'type', 'uploadedDate', 'tags', 'actions'];
  pageSize = 10;
  currentPage = 0;
  searchQuery = '';
  selectedType = '';
  mediaTypes = ['Video', 'Clip', 'Trailer', 'Image'];
  filteredMedia: any[] = [];
  pagedMedia: any[] = [];
  editingMedia: any = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchMedia();
  }

  fetchMedia(): void {
    this.http.get<any[]>('https://localhost:7166/api/Media').subscribe({
      next: (data) => {
        this.mediaLibrary = data;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error fetching media:', err);
        this.snackBar.open('Failed to fetch media.', 'Close', { duration: 2000 });
      },
    });
  }

  applyFilters(): void {
    let data = [...this.mediaLibrary];

    if (this.searchQuery) {
      data = data.filter((media) =>
        media.fileName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.selectedType) {
      data = data.filter((media) => media.type === this.selectedType);
    }

    this.filteredMedia = data;
    this.updatePagedMedia();
  }

  updatePagedMedia(): void {
    this.pagedMedia = this.filteredMedia.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.updatePagedMedia();
  }

  startEdit(media: any): void {
    this.editingMedia = { ...media }; // Clone the media object to avoid direct modification
  }

  saveEdit(media: any): void {
    if (!this.editingMedia) return;

    this.http.put(`https://localhost:7166/api/Media/${media.mediaId}`, this.editingMedia, { responseType: 'text' }).subscribe({
      next: (response) => {
        console.log(response);
        this.snackBar.open('Media updated successfully.', 'Close', { duration: 2000 });
        this.editingMedia = null;
        this.fetchMedia();
      },
      error: (err) => {
        console.error('Error updating media:', err);
        this.snackBar.open('Failed to update media.', 'Close', { duration: 2000 });
      },
    });
  }

  cancelEdit(): void {
    this.editingMedia = null;
  }

  deleteMedia(media: any): void {
    this.http.delete(`https://localhost:7166/api/Media/${media.mediaId}`, { responseType: 'text' }).subscribe({
      next: (response) => {
        console.log(response);
        this.snackBar.open('Media deleted successfully.', 'Close', { duration: 2000 });
        this.fetchMedia();
      },
      error: (err) => {
        console.error('Error deleting media:', err);
        this.snackBar.open('Failed to delete media.', 'Close', { duration: 2000 });
      },
    });
  }
}
