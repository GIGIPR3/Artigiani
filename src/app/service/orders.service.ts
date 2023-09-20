import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl =
    'http://ec2-54-216-114-29.eu-west-1.compute.amazonaws.com:8082/api/ordini';

  constructor(private http: HttpClient) {}

  postOrder(order: any): Observable<any> {
    console.log('orderService');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(this.baseUrl, order, httpOptions);
  }

  getOrder(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
