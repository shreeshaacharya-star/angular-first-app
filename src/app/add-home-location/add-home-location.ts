import { Component, computed, effect, inject } from '@angular/core';
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
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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

  isEditMode = toSignal(
    this.currentRoute.url.pipe(map((urlSegment) => urlSegment.at(0)?.toString() === 'edit'))
  );
  readonly id = toSignal<string>(this.currentRoute.params.pipe(map((param) => param['id'])));
  housingLocation = computed(() => {
    if (this.isEditMode()) {
      return this.housingService.getHousingLocationById(Number(this.id()));
    }
    return undefined;
  });

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

  constructor() {
    effect(() => {
      const location = this.housingLocation();
      if (location) {
        this.locationForm.patchValue(location);
      }
    });
  }

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
    if (this.isEditMode()) {
      this.housingService.updateLocationInfo(Number(this.id()), this.locationForm.getRawValue());
    } else {
      this.housingService.addLocation(this.locationForm.getRawValue());
    }
    this.locationForm.markAsPristine(); // Make form pristine to pass the form-guard (don't ask any confirmation in this case)
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.isEditMode() && control.value === this.housingLocation()?.name) {
        return null;
      }

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
