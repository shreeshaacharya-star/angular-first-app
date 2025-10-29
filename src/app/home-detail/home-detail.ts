import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HousingService } from '../service/housingService';
// import { HousingLocationInfo } from '../types/housinglocation';

@Component({
  selector: 'app-home-detail',
  imports: [RouterLink],
  templateUrl: './home-detail.html',
  styleUrl: './home-detail.css',
})
export class HomeDetail {
  readonly id: WritableSignal<string | null> = signal('');
  private route = inject(ActivatedRoute);
  private houseService = inject(HousingService);

  constructor() {
    // this.id.set(this.route.snapshot.paramMap.get('id'));
    this.route.params.subscribe((params) => {
      this.id.set(params['id']);
    });
  }
  housingLocation = computed(() => this.houseService.getHousingLocationById(Number(this.id())));

  goNext() {
    return this.houseService.getIdOfNextLocation(this.id() ?? '0');
  }
  goPrevious() {
    return this.houseService.getIdOfPreviousLocation(this.id() ?? '0');
  }
}
