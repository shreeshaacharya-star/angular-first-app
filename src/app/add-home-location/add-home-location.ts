import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-home-location',
  imports: [ReactiveFormsModule],
  templateUrl: './add-home-location.html',
  styleUrl: './add-home-location.css',
})
export class AddHomeLocation {
  name = new FormControl('');

  onUpdate() {
    this.name.setValue('Nancy');
  }
}
