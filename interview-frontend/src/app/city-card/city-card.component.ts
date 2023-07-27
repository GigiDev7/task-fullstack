import { Component, Input } from '@angular/core';
import { City } from '../interface';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss'],
})
export class CityCardComponent {
  @Input('city') city!: City;
}
