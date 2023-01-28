import {Component, Input} from '@angular/core'
import {CarService} from "../../../core/services/car/car.service";


@Component({
    selector: 'app-cars-table',
    templateUrl: './cars-table.component.html',
    styleUrls: ['./cars-table.component.scss'],
})
export class CarsTableComponent {

    @Input('title') title: string = ''

    @Input('linkCard') linkCard: string = ''

    constructor(
        public carService: CarService
    ) {
    }

}
