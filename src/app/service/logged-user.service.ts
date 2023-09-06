import { CookieService } from 'ngx-cookie-service';
import { User } from '../interfaces/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserService {
  constructor(private cookieService: CookieService) {}

  user!: User;

  updateCookies() {
    this.cookieService.deleteAll();
    this.cookieService.set('user', JSON.stringify(this.user));
  }

  getUser() {
    return this.cookieService.get('user');
  }

  
}
