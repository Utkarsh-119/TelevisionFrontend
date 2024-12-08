import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet,RouterLink, } from '@angular/router';
@Component({
  selector: 'app-reporter',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    FormsModule,MatListModule,RouterOutlet ,RouterLink,],
  templateUrl: './reporter.component.html',
  styleUrl: './reporter.component.css'
})
export class ReporterComponent {
  isSidenavOpen = true;

  

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
