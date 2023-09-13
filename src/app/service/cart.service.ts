import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private cookieService: CookieService) {}

  cart: string[] = [];

  updateCartCookies() {
    this.cookieService.set('cart', JSON.stringify(this.cart));
  }

  getCart() {
    return this.cookieService.get('cart');
  }

  clearCart() {
    this.cart = [];
  }
}
