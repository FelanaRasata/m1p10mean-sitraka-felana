import { Component, Input } from '@angular/core'
import { CarService } from '../../../core/services/car/car.service'
import { PaginationService } from '../../../core/services/pagination/pagination.service'
import { PageEvent } from '@angular/material/paginator'


@Component({
    selector: 'app-cars-table',
    templateUrl: './cars-table.component.html',
    styleUrls: ['./cars-table.component.scss'],
})
export class CarsTableComponent {
    private query: any

    @Input('title') title: string = ''

    @Input('linkCard') linkCard: string = ''


    constructor(
        public carService: CarService,
        public paginationService: PaginationService,
    ) {
    }


    setPage($event: PageEvent): void {

        this.carService.cars.next([])

        this.paginationService.paginationData.next({
            ...this.paginationService.paginationData.value,
            page: $event.pageIndex + 1,
            limit: $event.pageSize,
        })

        this.carService.getCars(
            {
                page: $event.pageIndex + 1,
                limit: $event.pageSize,
                sort: '-createdAt',
            },
        ).subscribe(() => {})

    }

}
