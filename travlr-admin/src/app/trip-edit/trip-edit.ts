import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-edit',
  standalone: false,
  styleUrl: './trip-edit.css',
  templateUrl: './trip-edit.html',
})
export class TripEdit implements OnInit {
  tripForm: FormGroup;
  isEditMode = false;
  originalTripCode = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tripDataService: TripData
  ) {
    this.tripForm = this.fb.group({
      tripCode: ['', Validators.required],
      name: ['', Validators.required],
      length: [''],
      startDate: [''],
      resort: [''],
      perPerson: [''],
      image: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    const tripCode = this.route.snapshot.paramMap.get('tripCode');
    if (tripCode) {
      this.isEditMode = true;
      this.originalTripCode = tripCode;
      this.tripDataService.getTrip(tripCode).subscribe({
        next: (trip) => this.tripForm.patchValue(trip),
        error: (err) => (this.errorMessage = 'Could not load trip: ' + err.message),
      });
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.tripForm.invalid) {
      this.errorMessage = 'Trip Code and Name are required.';
      return;
    }

    const trip: Trip = this.tripForm.value;

    if (this.isEditMode) {
      this.tripDataService.updateTrip(trip).subscribe({
        next: () => {
          this.successMessage = 'Trip updated successfully. Returning to the trip list...';
          setTimeout(() => this.router.navigate(['/']), 900);
        },
        error: (err) => (this.errorMessage = 'Could not update trip: ' + err.message),
      });
    } else {
      this.tripDataService.addTrip(trip).subscribe({
        next: () => {
          this.successMessage = 'Trip added successfully. Returning to the trip list...';
          setTimeout(() => this.router.navigate(['/']), 900);
        },
        error: (err) => (this.errorMessage = 'Could not add trip: ' + err.message),
      });
    }
  }

  onDelete(): void {
    if (!this.isEditMode) {
      return;
    }
    if (!confirm('Delete this trip? This cannot be undone.')) {
      return;
    }
    this.tripDataService.deleteTrip(this.originalTripCode).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => (this.errorMessage = 'Could not delete trip: ' + err.message),
    });
  }
}