import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://ec2-34-241-199-99.eu-west-1.compute.amazonaws.com:8081/api/products';
  private deleteApiUrl = 'http://ec2-34-241-199-99.eu-west-1.compute.amazonaws.com:8081/api/product';

  constructor(private http: HttpClient) {}

  postProduct(productData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiUrl}`, JSON.stringify(productData), {
      headers,
    });
  }

  getProductsByUserId(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;

    return this.http.get<any>(url);
  }

  getAllProducts() {
    return this.http.get<any>(this.apiUrl);
  }

  deleteProduct(productId: string) {
    return this.http.delete<any>(this.deleteApiUrl + '/' + productId);
  }

  getProductbyId(productId: string): Observable<any> {
    const url = `http://ec2-34-241-199-99.eu-west-1.compute.amazonaws.com:8081/api/getProductById/${productId}`;
    return this.http.get<any>(url);
  }

  getProductbyName(productName: string): Observable<any> {
    const url = `http://ec2-34-241-199-99.eu-west-1.compute.amazonaws.com:8081/api/nameStartsWith/${productName}`;
    return this.http.get<any>(url);
  }

  patchProduct(productData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.patch<any>(`${this.apiUrl}`, JSON.stringify(productData), {
      headers,
    });
  }
}
