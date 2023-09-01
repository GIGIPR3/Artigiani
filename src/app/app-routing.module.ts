import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistratiComponent } from './registrati/registrati.component';
import { LoginComponent } from './login/login.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:'', component: HomepageComponent},

  {
    path:'registrati', component:RegistratiComponent
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'marketplace', component: MarketplaceComponent
  },
  {
    path:'admin', component: AdminComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
