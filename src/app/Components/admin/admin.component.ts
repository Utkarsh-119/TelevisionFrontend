import { Component,inject ,ViewChild } from '@angular/core';
import { AdminService,User } from '../../Services/admin.service';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink, } from '@angular/router';
import { MatDialog , MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,MatDialogModule,RouterLink,FormsModule, MatPaginatorModule,MatListModule,MatIconModule,MatTableModule ,MatSidenavModule,MatFormFieldModule,MatInputModule,MatButtonModule, MatSelectModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  userService = inject(AdminService);
  snackBar = inject(MatSnackBar);
  http = inject(HttpClient);
  users: User[] = [];
  displayedColumns: string[] = ['userId', 'username', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  searchValue: string = '';
  isSidenavOpen = true;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  constructor() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.dataSource.data = this.users;
    });
  }
  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  get filteredUsers() {
    const filteredData = this.users.filter(user =>
      user.username.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      user.userId.toString().includes(this.searchValue)
    );
    this.dataSource.data = filteredData;
    return filteredData;
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        // Remove the user from the local list
        this.users = this.users.filter(user => user.userId !== userId);
        this.dataSource.data = this.users;

        // Show success message
        this.snackBar.open('User deleted successfully!', 'Close', {
          duration: 2000,
        });
      },
      (error) => {
        // Handle error
        this.snackBar.open('Failed to delete user. Please try again.', 'Close', {
          duration: 2000,
        });
      }
    );
  }

  updateUser(user: User) {
    const apiUrl = `https://localhost:7166/api/User/${user.userId}`;
    const updatedUser = {
      username: user.username,
      role: user.role,
      email: user.email,
    };

    this.http.put(apiUrl, updatedUser).subscribe(
      () => {
        this.snackBar.open('User updated successfully!', 'Close', { duration: 2000 });
      },
      (error) => {
        this.snackBar.open('Failed to update user. Please try again.', 'Close', { duration: 2000 });
      }
    );
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
