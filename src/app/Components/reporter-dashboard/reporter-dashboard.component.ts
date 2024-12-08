import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reporter-dashboard',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,],
  templateUrl: './reporter-dashboard.component.html',
  styleUrl: './reporter-dashboard.component.css'
})
export class ReporterDashboardComponent {
  reportData: any[] = [];
  displayedColumns: string[] = ['reportId', 'type', 'generatedDate', 'data', 'createdBy'];
  filteredReports: any[] = [];
  pagedReports: any[] = [];
  pageSize = 10;
  currentPage = 0;
  typeFilter = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReports();
  }

  fetchReports(): void {
    this.http.get<any[]>('https://localhost:7166/api/Report').subscribe(
      (response) => {
        this.reportData = response;
        this.applyFilters(); // Apply filters and update pagination
      },
      (error) => {
        console.error('Error fetching report data:', error);
      }
    );
  }

  applyFilters(): void {
    let data = [...this.reportData];

    // Filter by Type
    if (this.typeFilter) {
      data = data.filter((report) => report.type.toLowerCase().includes(this.typeFilter.toLowerCase()));
    }

    this.filteredReports = data;
    this.updatePagedReports();
  }

  updatePagedReports(): void {
    this.pagedReports = this.filteredReports.slice(
      this.currentPage * this.pageSize,
      (this.currentPage + 1) * this.pageSize
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.updatePagedReports();
  }
}
