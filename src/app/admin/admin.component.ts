import { Component, OnInit } from '@angular/core';
/* import { ServizioService } from '../service/servizio.service'; */
import { User } from '../interfaces/user';
import { LoggedUserService } from '../service/logged-user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {


  productForm = FormGroup

  user: User | null = this.http.user;

  constructor(private http: LoggedUserService) {this.http.getUser()}

  ngOnInit(): void {

    this.productForm = new FormGroup ({
        /* img: new FormControl(null), */
        titolo: new FormControl(null),
        prezzo: new FormControl(null)
    })
  }


  modaleVisibile = false;

  visualizzaModale(){
    this.modaleVisibile = !this.modaleVisibile

  }









}
