import { Component, inject, input, output } from '@angular/core';
import { HousingLocationInfo } from '../types/housinglocation';
import { RouterLink } from '@angular/router';
import { HousingService } from '../service/housingService';

@Component({
  selector: 'app-housing-location',
  imports: [RouterLink],
  templateUrl: './housing-location.html',
  styleUrl: './housing-location.css',
})
export class HousingLocation {
  housingLocation = input.required<HousingLocationInfo>();
  housingService = inject(HousingService);
  // @Input({ required: true }) housingLocation!: HousingLocationInfo;
  // onSelect = output<{ housingInfo: HousingLocationInfo; selected: boolean }>();
  isChecked = false;

  onCheckboxSelected(event: Event) {
    this.isChecked = (event.target as HTMLInputElement).checked;
    this.housingService.onSelected(this.housingLocation(), this.isChecked);
  }
}
