import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdsService {

  private apiUrl = 'https://localhost:7166/api/Advertisment';

  constructor(private http: HttpClient) {}
  getAllAdvertisements(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addAdvertisement(advertisement: any): Observable<any> {
    return this.http.post(this.apiUrl, advertisement);
  }
  deleteAdvertisement(adId: number): Observable<any> {
    const url = `${this.apiUrl}/${adId}`;
    return this.http.delete(url, { responseType: 'text' });
  }
  updateAdvertisement(adId: number, advertisement: any): Observable<any> {
    const url = `${this.apiUrl}/${adId}`;
    return this.http.put(url, advertisement, { responseType: 'text' }); 
  }
  
}
