import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ScheduleService } from '../../Services/schedule.service';

@Component({
  selector: 'app-manage-schedule',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,],
  templateUrl: './manage-schedule.component.html',
  styleUrl: './manage-schedule.component.css'
})
export class ManageScheduleComponent {
  displayedColumns: string[] = ['scheduleId', 'showId', 'airDate', 'timeSlot', 'assignedEditorId', 'status', 'actions'];
  schedules: any[] = []; // Full data from API
  paginatedSchedules: any[] = []; // Data for the current page
  pageSize = 10;
  currentPageIndex = 0;

  constructor(private scheduleService: ScheduleService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.fetchSchedules();
  }

  fetchSchedules() {
    this.scheduleService.getSchedules().subscribe((data) => {
      this.schedules = data;
      this.updatePaginatedSchedules();
    });
  }

  updatePaginatedSchedules() {
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedSchedules = this.schedules.slice(startIndex, endIndex);
  }

  onPageChange(event: any) {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedSchedules();
  }

  saveSchedule(schedule: any) {
    console.log('Saving schedule:', schedule);
    this.snackBar.open('Schedule updated successfully!', 'Close', { duration: 3000 });
    // Implement save logic here if needed
  }

  deleteSchedule(schedule: any) {
    this.scheduleService.deleteSchedule(schedule.scheduleId).subscribe(
      () => {
        this.snackBar.open('Schedule deleted successfully!', 'Close', { duration: 3000 });
        this.schedules = this.schedules.filter((s) => s.scheduleId !== schedule.scheduleId);
        this.updatePaginatedSchedules();
      },
      (error) => {
        this.snackBar.open('Failed to delete the schedule.', 'Close', { duration: 3000 });
        console.error('Error deleting schedule:', error);
      }
    );
  }
}
