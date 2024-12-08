import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiUrl = 'https://localhost:7166/api/Schdules';

  constructor(private http: HttpClient) {}

  getSchedules(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteSchedule(scheduleId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${scheduleId}`, { responseType: 'text' });
  }
}
