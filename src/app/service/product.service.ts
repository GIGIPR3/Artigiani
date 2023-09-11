import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  postProduct(productData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the Content-Type to application/json
    });

    return this.http.post<any>(
      `${this.apiUrl}`,
      JSON.stringify(productData),
      { headers } // Pass the headers as an option
    );
  }

  getProductsByUserId(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;

    return this.http.get<any>(url);
  }

  getAllProducts() {
    return this.http.get<any>(this.apiUrl);
  }
}
