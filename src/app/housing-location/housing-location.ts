import { Component, Input, input } from '@angular/core';
import { HousingLocationInfo } from '../types/housinglocation';

@Component({
  selector: 'app-housing-location',
  imports: [],
  templateUrl: './housing-location.html',
  styleUrl: './housing-location.css',
})
export class HousingLocation {
  // housingLocation = input.required<HousingLocationInfo>();
  @Input({ required: true }) housingLocation!: HousingLocationInfo;
}
