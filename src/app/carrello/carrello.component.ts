import { Component } from '@angular/core';
import { LoggedUserService } from '../service/logged-user.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css'],
})
export class CarrelloComponent {
  cartItems: any[] | null = [];

  constructor(private loggedUserService: LoggedUserService) {}
}
