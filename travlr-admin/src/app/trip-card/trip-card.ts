import { Component, Input } from '@angular/core';
import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  standalone: false,
  styleUrl: './trip-card.css',
  templateUrl: './trip-card.html',
})
export class TripCard {
  @Input() trip!: Trip;

  constructor(public authService: Authentication) {}
}