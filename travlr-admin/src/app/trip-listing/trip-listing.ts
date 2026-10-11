import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-listing',
  standalone: false,
  styleUrl: './trip-listing.css',
  templateUrl: './trip-listing.html',
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  errorMessage = '';

  constructor(
    private tripDataService: TripData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Could not load trips from the API: ' + err.message;
        this.cdr.detectChanges();
      },
    });
  }
}