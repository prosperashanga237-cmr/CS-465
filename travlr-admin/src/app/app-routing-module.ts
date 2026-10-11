import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { TripEdit } from './trip-edit/trip-edit';

const routes: Routes = [
  { path: '', component: TripListing },
  { path: 'add-trip', component: TripEdit },
  { path: 'edit-trip/:tripCode', component: TripEdit },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}