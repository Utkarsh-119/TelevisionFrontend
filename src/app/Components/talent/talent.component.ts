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
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-talent',
  standalone: true,
  imports: [CommonModule,MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,],
  templateUrl: './talent.component.html',
  styleUrl: './talent.component.css'
})
export class TalentComponent {
  talentData: any[] = [];
  displayedColumns: string[] = ['talentId', 'name', 'role', 'showId', 'contractStartDate', 'contractEndDate', 'status'];
  filteredTalents: any[] = [];
  pagedReports: any[] = [];
  pageSize = 10;
  currentPage = 0;
  searchFilter = '';
  roleFilter = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTalents();
  }

  fetchTalents(): void {
    this.http.get<any[]>('https://localhost:7166/api/Talent').subscribe(
      (response) => {
        this.talentData = response;
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching talent data:', error);
      }
    );
  }

  applyFilters(): void {
    let data = [...this.talentData];

    // Filter by Search
    if (this.searchFilter) {
      data = data.filter((talent) =>
        talent.name.toLowerCase().includes(this.searchFilter.toLowerCase())
      );
    }

    // Filter by Role
    if (this.roleFilter) {
      data = data.filter((talent) =>
        talent.role.toLowerCase().includes(this.roleFilter.toLowerCase())
      );
    }

    this.filteredTalents = data;
  }
  

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  clearFilters(): void {
    this.searchFilter = '';
    this.roleFilter = '';
    this.applyFilters();
  }
}
