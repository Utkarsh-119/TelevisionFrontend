import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  userId: number;
  username: string;
  password: string | null;
  role: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'https://localhost:7166/api/User';

  constructor(private http: HttpClient) {}
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
