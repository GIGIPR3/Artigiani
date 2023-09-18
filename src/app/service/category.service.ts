import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8081/api/categories';

  constructor(private http: HttpClient) {}

  postCategory(category: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(this.baseUrl, category, httpOptions);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
