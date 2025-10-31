import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HousingService } from '../service/housingService';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CanComponentDeactivate } from '../guard/form-guard-guard';

@Component({
  selector: 'app-add-home-location',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-home-location.html',
  styleUrl: './add-home-location.css',
})
export class AddHomeLocation implements CanComponentDeactivate {
  formBuilder = inject(NonNullableFormBuilder);
  housingService = inject(HousingService);
  router = inject(Router);
  currentRoute = inject(ActivatedRoute);

  states = ['IL', 'CA', 'AK', 'IN', 'OR'];

  locationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(6), this.forbiddenNameValidator()]],
    city: ['', Validators.required],
    state: [''],
    photo: [''],
    availableUnits: [1, Validators.min(1)],
    wifi: [false],
    laundry: [false],
    isPremium: [false],
  });

  get name() {
    return this.locationForm.get('name');
  }

  get city() {
    return this.locationForm.get('city');
  }

  get availableUnits() {
    return this.locationForm.get('availableUnits');
  }

  // Shows a confirm message if the form is dirty
  hasUnsavedChanges() {
    return this.locationForm.dirty;
  }

  onSubmit() {
    this.housingService.addLocation(this.locationForm.getRawValue());
    this.locationForm.markAsPristine(); // Make form pristine to pass the form-guard (don't ask any confirmation in this case)
    this.router.navigate(['../'], { relativeTo: this.currentRoute, replaceUrl: true });
  }

  forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = this.housingService
        .housingLocationList()
        .some(
          (housingLocation) => housingLocation.name.toLowerCase() === control.value.toLowerCase()
        );
      return forbidden
        ? { forbiddenName: { value: control.value, message: '! Name already exists' } }
        : null;
    };
  }
}
