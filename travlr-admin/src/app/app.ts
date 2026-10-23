import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from './services/authentication';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('travlr-admin');

  constructor(
    public authService: Authentication,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
