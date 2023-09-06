import { Component } from '@angular/core';
/* import { ServizioService } from '../service/servizio.service'; */
import { User } from '../interfaces/user';
import { LoggedUserService } from '../service/logged-user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {

  user: User | null = this.http.user;

  constructor(private http: LoggedUserService) {this.http.getUser()}


  modaleVisibile = false;

  visualizzaModale(){
    this.modaleVisibile = !this.modaleVisibile

  }

}
