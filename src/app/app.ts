import { Component, signal } from '@angular/core';
import { Home } from './home/home';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'first-app';
}
