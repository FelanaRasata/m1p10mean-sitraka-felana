import {Component} from '@angular/core';
import {CarService} from "../../../core/services/car/car.service";

@Component({
    selector: 'app-car-item',
    templateUrl: './car-item.component.html',
    styleUrls: ['./car-item.component.scss']
})
export class CarItemComponent {
    constructor(
        public carService: CarService
    ) {
    }
}
