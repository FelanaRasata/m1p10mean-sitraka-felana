import {Component, Input} from '@angular/core';
import {ICar} from "../../../core/models/cars.schema";

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.scss']
})
export class CarsTableComponent {

  @Input() cars : ICar[] = [];

}
