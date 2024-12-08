import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: string = 'Admin'; // Default role
  roles: string[] = ['Admin', 'Channel Manager', 'Advertiser','Director','Reporter','Content Producer'];
  apiUrl: string = 'https://localhost:7166/api/Login/login';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const requestBody = {
      name: this.username,
      password: this.password,
      role: this.role
    };

    this.http.post(this.apiUrl, requestBody, { responseType: 'text' })
      .subscribe({
        next: (token: string) => {
          console.log('Login successful!');
          localStorage.setItem('jwtToken', token);
          this.redirectUser();
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials.');
        }
      });
  }

  redirectUser() {
    switch (this.role) {
      case 'Admin':
        this.router.navigate(['/Admin']);
        break;
      case 'Channel Manager':
        this.router.navigate(['/Channel_manager']);
        break;
      case 'Advertiser':
        this.router.navigate(['/Advertiser']);
        break;
      case 'Director':
        this.router.navigate(['/Director']);
        break;
      case 'Reporter':
        this.router.navigate(['/Reporter']);
        break;
      case 'Content Producer':
        this.router.navigate(['/Content_Producer']);
        break;    
      default:
        console.error('Unknown role:', this.role);
    }
  }
}
