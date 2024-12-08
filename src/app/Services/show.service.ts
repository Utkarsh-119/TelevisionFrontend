
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShowService {

  private apiUrl = 'https://localhost:7166/api/Shows';

  constructor(private http: HttpClient) {}

  getShows(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteShow(showId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${showId}`, { responseType: 'text' });
  }
}
