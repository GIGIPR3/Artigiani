import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:8081/api/review';
  constructor(private http: HttpClient) {}

  postReview(reviewData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log('entro in addDescription 2');
    return this.http.post<any>(`${this.apiUrl}`, reviewData, {
      headers,
    });
  }

  getReviewsFromProduct(productId: string): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<any>(url);
  }
}
