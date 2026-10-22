import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { TripEdit } from './trip-edit/trip-edit';
import { Login } from './login/login';
import { authGuard } from './services/auth-guard';

const routes: Routes = [
  { path: '', component: TripListing },
  { path: 'login', component: Login },
  { path: 'add-trip', component: TripEdit, canActivate: [authGuard] },
  { path: 'edit-trip/:tripCode', component: TripEdit, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}