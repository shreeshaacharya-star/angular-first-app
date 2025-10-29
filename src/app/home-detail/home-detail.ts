import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HousingService } from '../service/housingService';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
// import { HousingLocationInfo } from '../types/housinglocation';

@Component({
  selector: 'app-home-detail',
  imports: [RouterLink],
  templateUrl: './home-detail.html',
  styleUrl: './home-detail.css',
})
export class HomeDetail {
  private route = inject(ActivatedRoute);
  private houseService = inject(HousingService);

  readonly id = toSignal(this.route.params.pipe(map((params) => params['id'])));
  housingLocation = computed(() => this.houseService.getHousingLocationById(Number(this.id())));

  goToNext() {
    return this.houseService.getIdOfNextLocation(this.id() ?? '');
  }
  goToPrevious() {
    return this.houseService.getIdOfPreviousLocation(this.id() ?? '');
  }
}
