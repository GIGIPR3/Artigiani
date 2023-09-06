import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { RegistratiComponent } from './registrati/registrati.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarrelloComponent } from './carrello/carrello.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegistratiComponent,
    LoginComponent,
    MarketplaceComponent,
    AdminComponent,
    CarrelloComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
