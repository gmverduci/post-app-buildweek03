import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { BrowseComponent } from './components/browse/browse.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
   {
    path: "login",
    component: LoginComponent
  },
  {
    path: "browse",
    component: BrowseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
