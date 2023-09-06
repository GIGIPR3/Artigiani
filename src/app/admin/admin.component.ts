import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
/* import { ServizioService } from '../service/servizio.service'; */
import { User } from '../interfaces/user';
import { LoggedUserService } from '../service/logged-user.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  user: User = this.http.user

  constructor(private http: LoggedUserService) {this.http.getUser()}

  /* modaleVisible = false;

  myModale: HTMLCollectionOf<Element> = document.getElementsByClassName("form");

  visualizzaModale(){
    addEventListener("click", () => {
      this.modaleVisible = !this.modaleVisible
      if (this.modaleVisible) {
        this.myModale.classList.remove("disabilita")
        this.myModale.classList.add("attiva")
      }
    })
  } */

  modaleVisibile = false;

  visualizzaModale(){
    this.modaleVisibile = !this.modaleVisibile

  }





}
