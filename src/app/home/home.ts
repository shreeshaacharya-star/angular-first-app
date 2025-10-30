import { Component, inject, Signal } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../types/housinglocation';
import { HousingService } from '../service/housingService';
import { BackShadow } from '../back-shadow/back-shadow';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HousingLocation, BackShadow, BackShadow, RouterLink, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  housingService: HousingService = inject(HousingService);
  housingLocationList: Signal<HousingLocationInfo[]> = this.housingService.housingLocationList;

  togglePremium() {
    this.housingService.togglePremium();
  }

  shuffleCards() {
    this.housingService.shuffleCards();
  }

  delectSelectedCards() {
    this.housingService.delectSelectedCards();
  }

  filterResults(text: string) {
    this.housingService.filterResults(text);
  }
}
