import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ShowService } from '../../Services/show.service';
@Component({
  selector: 'app-manage-shows',
  standalone: true,
  imports: [ CommonModule,FormsModule, MatIconModule,MatTableModule, MatPaginatorModule, MatButtonModule,MatInputModule],
  templateUrl: './manage-shows.component.html',
  styleUrls: ['./manage-shows.component.css']
})
export class ManageShowsComponent implements OnInit{
  displayedColumns: string[] = ['showId', 'title', 'genre', 'duration', 'actions'];
  shows: any[] = []; // Full data from API
  paginatedShows: any[] = []; // Data for the current page
  pageSize = 10; // Default number of items per page
  currentPageIndex = 0;

  constructor(private showService: ShowService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.fetchShows();
  }

  fetchShows() {
    this.showService.getShows().subscribe((data) => {
      this.shows = data; // Full dataset
      this.updatePaginatedShows(); // Populate the first page
    });
  }

  updatePaginatedShows() {
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedShows = this.shows.slice(startIndex, endIndex);
  }

  onPageChange(event: any) {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedShows();
  }

  saveShow(show: any) {
    // Add logic to save the edited show (e.g., send PUT/POST request)
    console.log('Saving show:', show);
  }

  deleteShow(show: any) {
    this.showService.deleteShow(show.showId).subscribe(
      () => {
        // Remove the deleted show from the local array
        this.shows = this.shows.filter((s) => s.showId !== show.showId);
        this.updatePaginatedShows();
        this.snackBar.open('Show deleted successfully', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error deleting show:', error);
        this.snackBar.open('Failed to delete show', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
