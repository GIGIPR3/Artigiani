import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { LoggedUserService } from '../service/logged-user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor(private logauth: LoggedUserService) {}

  user: User | null = null;

  generateArtigianiArray(numArtigiani: number): any[] {
    return new Array(numArtigiani);
  }

  ngOnInit() {
    const userJson = this.logauth.getUser();

    if (userJson) {
      this.user = JSON.parse(userJson);
      console.log('User data:', this.user);
    } else {
      console.log('User data not found in cookies');
    }
  }

  logout() {
    this.logauth.logout();
  }
}
