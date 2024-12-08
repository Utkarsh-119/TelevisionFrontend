import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-feedback',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,],
  templateUrl: './manage-feedback.component.html',
  styleUrl: './manage-feedback.component.css'
})
export class ManageFeedbackComponent implements OnInit{
  feedbackData: any[] = [];
  displayedColumns: string[] = ['feedbackId', 'showId', 'date', 'feedback', 'rating', 'submittedBy'];
  pageSize = 10;
  currentPage = 0;
  showIdFilter = '';
  sortOrder = 'asc';
  filteredFeedback: any[] = [];
  pagedFeedback: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFeedback();
  }

  fetchFeedback(): void {
    this.http.get<any[]>('https://localhost:7166/api/ViewerFeedback')
      .subscribe(
        (response) => {
          this.feedbackData = response;
          this.applyFilters(); // Apply filters and update pagination after fetching data
        },
        (error) => {
          console.error('Error fetching feedback data:', error);
        }
      );
  }

  applyFilters(): void {
    let data = [...this.feedbackData];

    // Filter by ShowId
    if (this.showIdFilter) {
      data = data.filter((feedback) => feedback.showId.toString().includes(this.showIdFilter));
    }

    // Sort by Rating
    if (this.sortOrder === 'asc') {
      data = data.sort((a, b) => a.rating - b.rating);
    } else {
      data = data.sort((a, b) => b.rating - a.rating);
    }

    this.filteredFeedback = data;
    this.updatePagedFeedback();
  }

  updatePagedFeedback(): void {
    this.pagedFeedback = this.filteredFeedback.slice(
      this.currentPage * this.pageSize,
      (this.currentPage + 1) * this.pageSize
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.updatePagedFeedback();
  }
}
