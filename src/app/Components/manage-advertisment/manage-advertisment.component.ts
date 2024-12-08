import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AdsService } from '../../Services/Advertise/ads.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-manage-advertisment',
  standalone: true,
  imports: [ CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,],
  templateUrl: './manage-advertisment.component.html',
  styleUrl: './manage-advertisment.component.css'
})
export class ManageAdvertismentComponent  implements OnInit {
  advertisements: any[] = [];
  displayedAdvertisements: any[] = [];
  pageSize = 10;
  totalAdvertisements = 0;
  currentPage = 0;

  editingAd: any = null;

  constructor(
    private adService: AdsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAdvertisements();
  }

  // Load all advertisements with pagination
  loadAdvertisements(pageIndex: number = 0, pageSize: number = this.pageSize) {
    this.adService.getAllAdvertisements().subscribe(
      (data) => {
        this.totalAdvertisements = data.length;
        this.advertisements = data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
        this.displayedAdvertisements = this.advertisements;
      },
      (error) => this.showSnackBar('Failed to load advertisements', 'error')
    );
  }

  // Add a new advertisement
 

  // Update an advertisement
  updateAdvertisement(ad: any) {
    this.adService.updateAdvertisement(ad.adId, ad).subscribe(
      () => {
        this.showSnackBar('Advertisement updated successfully', 'success');
        this.loadAdvertisements(); // Reload advertisements to reflect updates
      },
      (error) => {
        this.showSnackBar('Failed to update advertisement', 'error');
      }
    );
  }

  // Delete an advertisement
  deleteAdvertisement(adId: number) {
    this.adService.deleteAdvertisement(adId).subscribe(
      () => {
        this.showSnackBar('Advertisement deleted successfully', 'success');
        this.loadAdvertisements(); // Reload the advertisements after deletion
      },
      (error) => {
        this.showSnackBar('Failed to delete advertisement', 'error');
      }
    );
  }

  // Snackbar for feedback
  showSnackBar(message: string, type: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }

  // Enable editing for a specific advertisement
  enableEdit(ad: any) {
    this.editingAd = { ...ad };
  }

  // Save changes to the advertisement
  saveChanges() {
    if (this.editingAd) {
      this.updateAdvertisement(this.editingAd);
      this.editingAd = null;
    }
  }

  // Cancel editing
  cancelEdit() {
    this.editingAd = null;
  }

  // Handle page changes for pagination
  onPageChange(event: PageEvent) {
    this.loadAdvertisements(event.pageIndex, event.pageSize);
  }
}
