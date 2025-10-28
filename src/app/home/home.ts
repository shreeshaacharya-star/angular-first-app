import { Component, inject, Signal } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../types/housinglocation';
import { HousingService } from '../service/housingService';
import { BackShadow } from '../back-shadow/back-shadow';

@Component({
  selector: 'app-home',
  imports: [HousingLocation, BackShadow, BackShadow],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // housingLocationList: HousingLocationInfo[];
  housingService: HousingService = inject(HousingService);
  housingLocationList: Signal<HousingLocationInfo[]> = this.housingService.housingLocationList;

  // constructor(housingService: HousingService) {
  //   this.housingService = housingService;
  //   // this.housingLocationList = this.housingService.getAllHousingLocations();
  // }

  togglePremium() {
    this.housingService.togglePremium();
  }

  shuffleCards() {
    this.housingService.shuffleCards();
  }

  delectSelectedCards() {
    this.housingService.delectSelectedCards();
  }

  // filterResults(text: string) {
  //   this.housingService.filterResults(text);
  // }
}
