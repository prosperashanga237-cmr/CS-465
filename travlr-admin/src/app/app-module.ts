import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TripListing } from './trip-listing/trip-listing';
import { TripCard } from './trip-card/trip-card';
import { TripEdit } from './trip-edit/trip-edit';
import { Login } from './login/login';
import { authInterceptor } from './services/auth-interceptor';

@NgModule({
  declarations: [App, TripListing, TripCard, TripEdit, Login],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
  bootstrap: [App],
})
export class AppModule {}