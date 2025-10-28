import { Injectable, signal, WritableSignal } from '@angular/core';
import { HousingLocationInfo } from '../types/housinglocation';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  private _selectedHousingLocations: WritableSignal<number[]> = signal([]);
  private _housingLocationList: WritableSignal<HousingLocationInfo[]> = signal([
    {
      id: 0,
      name: 'Acme Fresh Start Housing',
      city: 'Chicago',
      state: 'IL',
      photo: `${this.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
      availableUnits: 4,
      wifi: true,
      laundry: true,
      isPremium: true,
    },
    {
      id: 1,
      name: 'A113 Transitional Housing',
      city: 'Santa Monica',
      state: 'CA',
      photo: `${this.baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
      availableUnits: 0,
      wifi: false,
      laundry: true,
      isPremium: false,
    },
    {
      id: 2,
      name: 'Warm Beds Housing Support',
      city: 'Juneau',
      state: 'AK',
      photo: `${this.baseUrl}/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,
      availableUnits: 1,
      wifi: false,
      laundry: false,
      isPremium: false,
    },
    {
      id: 3,
      name: 'Homesteady Housing',
      city: 'Chicago',
      state: 'IL',
      photo: `${this.baseUrl}/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,
      availableUnits: 1,
      wifi: true,
      laundry: false,
      isPremium: false,
    },
    {
      id: 4,
      name: 'Happy Homes Group',
      city: 'Gary',
      state: 'IN',
      photo: `${this.baseUrl}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,
      availableUnits: 1,
      wifi: true,
      laundry: false,
      isPremium: true,
    },
    {
      id: 5,
      name: 'Hopeful Apartment Group',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,
      availableUnits: 2,
      wifi: true,
      laundry: true,
      isPremium: true,
    },
    {
      id: 6,
      name: 'Seriously Safe Towns',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,
      availableUnits: 5,
      wifi: true,
      laundry: true,
      isPremium: false,
    },
    {
      id: 7,
      name: 'Hopeful Housing Solutions',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/r-architecture-GGupkreKwxA-unsplash.jpg`,
      availableUnits: 2,
      wifi: true,
      laundry: true,
      isPremium: true,
    },
    {
      id: 8,
      name: 'Seriously Safe Towns',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/saru-robert-9rP3mxf8qWI-unsplash.jpg`,
      availableUnits: 10,
      wifi: false,
      laundry: false,
      isPremium: false,
    },
    {
      id: 9,
      name: 'Capital Safe Towns',
      city: 'Portland',
      state: 'OR',
      photo: `${this.baseUrl}/webaliser-_TPTXZd9mOo-unsplash.jpg`,
      availableUnits: 6,
      wifi: true,
      laundry: true,
      isPremium: true,
    },
  ]);

  readonly selectedHousingLocations = this._selectedHousingLocations.asReadonly();
  readonly housingLocationList = this._housingLocationList.asReadonly();

  getAllHousingLocations(): HousingLocationInfo[] {
    return this.housingLocationList();
  }

  getHousingLocationById(id: number): HousingLocationInfo | undefined {
    // return this.housingLocationList.find((housingLocation) => housingLocation.id === id); // Without using signals
    return this.housingLocationList().find((housingLocation) => housingLocation.id === id);
  }

  get selectedHousingCount() {
    return this.selectedHousingLocations().length;
  }

  onSelected(housingInfo: HousingLocationInfo, selected: boolean) {
    // if (selected) {
    //   this.selectedHousingLocations.push(housingInfo.id);
    // } else {
    //   this.selectedHousingLocations = this.selectedHousingLocations.filter(
    //     (selectedHousing) => selectedHousing !== housingInfo.id
    //   );
    // }

    this._selectedHousingLocations.update((housingLocationIds) =>
      selected
        ? [...housingLocationIds, housingInfo.id]
        : housingLocationIds.filter((id) => id !== housingInfo.id)
    );
  }

  togglePremium() {
    // this.housingLocationList = this.housingLocationList.map((location) => {
    //   if (this.selectedHousingLocations.includes(location.id)) {
    //     return { ...location, isPremium: !location.isPremium };
    //   }
    //   return location;
    // });
    // return this.housingLocationList;

    this._housingLocationList.update((housingLocationList) =>
      housingLocationList.map((housingLocation) => {
        if (this.selectedHousingLocations().includes(housingLocation.id)) {
          return { ...housingLocation, isPremium: !housingLocation.isPremium };
        }
        return housingLocation;
      })
    );
  }

  shuffleCards() {
    // const list = this.dummyData;
    // for (let i = list.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1)); // pick random index
    //   [list[i], list[j]] = [list[j], list[i]]; // swap
    // }
    // return list;

    this._housingLocationList.update((housingLocationList) => {
      for (let i = housingLocationList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // pick random index
        [housingLocationList[i], housingLocationList[j]] = [
          housingLocationList[j],
          housingLocationList[i],
        ]; // swap
      }
      return housingLocationList;
    });
  }

  delectSelectedCards() {
    // this.housingLocationList = this.housingLocationList.filter(
    //   (housingLocation) => !this.selectedHousingLocations.includes(housingLocation.id)
    // );
    // this.selectedHousingLocations = [];
    // return this.housingLocationList;

    this._housingLocationList.update((housingLocationList) =>
      housingLocationList.filter(
        (housingLocation) => !this.selectedHousingLocations().includes(housingLocation.id)
      )
    );
    this._selectedHousingLocations.set([]);
  }

  // filterResults(searchText: string) {
  //   if (!searchText) {
  //     return this.housingLocationList();
  //   }
  //   return this.housingLocationList().filter((housingLocation) =>
  //     housingLocation.city.toLowerCase().includes(searchText.toLowerCase())
  //   );
  // }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
  }
}
