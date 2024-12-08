import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdsService } from '../../Services/Advertise/ads.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-advertisement',
  standalone: true,
  imports: [ 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,],
  templateUrl: './add-advertisement.component.html',
  styleUrl: './add-advertisement.component.css'
})
export class AddAdvertisementComponent {
  advertisement = {
    clientName: '',
    slotTime: '',
    duration: '',
    rate: 0,
    assignedShow: 0,
    status: '',
  };

  constructor(private advertisementService: AdsService, private snackBar: MatSnackBar) {}

  onSubmit() {
    this.advertisementService.addAdvertisement(this.advertisement).subscribe(
      () => {
        this.snackBar.open('Advertisement added successfully!', 'Close', { duration: 3000 });
        this.resetForm();
      },
      (error) => {
        this.snackBar.open('Failed to add advertisement. Please try again.', 'Close', { duration: 3000 });
        console.error(error);
      }
    );
  }

  resetForm() {
    this.advertisement = {
      clientName: '',
      slotTime: '',
      duration: '',
      rate: 0,
      assignedShow: 0,
      status: '',
    };
  }
}
