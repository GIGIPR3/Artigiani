import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../interfaces/user';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserService {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private cartService: CartService
  ) {}

  user: User | null = null;

  updateCookies() {
    this.cookieService.deleteAll();
    this.cookieService.set('user', JSON.stringify(this.user));
  }

  getUser() {
    return this.cookieService.get('user');
  }

  logout() {
    this.cookieService.deleteAll();
    this.user = null;
    this.router.navigate(['/login']);
    this.cartService.clearCart();
  }
}
