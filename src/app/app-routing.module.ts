import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

import { authGuardFn } from './auth/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { RegistratiComponent } from './registrati/registrati.component';
import { CarrelloComponent } from './carrello/carrello.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },

  {
    path: 'registrati',
    component: RegistratiComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'marketplace',
    component: MarketplaceComponent,
  },
  {
    path: 'admin',
    canActivate: [authGuardFn()],
    component: AdminComponent,
  },
  {
    path: 'carrello',
    component: CarrelloComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
