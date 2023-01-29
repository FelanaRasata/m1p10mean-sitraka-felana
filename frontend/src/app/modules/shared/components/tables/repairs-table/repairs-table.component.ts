import { Component, Input } from '@angular/core'
import { RepairService } from '../../../core/services/repair/repair.service'
import { PaginationService } from '../../../core/services/pagination/pagination.service'
import { PageEvent } from '@angular/material/paginator'


@Component({
    selector: 'app-repairs-table',
    templateUrl: './repairs-table.component.html',
    styleUrls: ['./repairs-table.component.scss'],
})
export class RepairsTableComponent {
    @Input('title') title: string = ''

    @Input('car_id') carId: string = ''

    @Input('card_url_path') cardUrlPath: string | null = null


    constructor(
        public repairService: RepairService,
        public paginationService: PaginationService,
    ) {
    }


    setPage($event: PageEvent): void {

        this.repairService.repairs.next([])

        this.paginationService.paginationData.next({
            ...this.paginationService.paginationData.value,
            page: $event.pageIndex + 1,
            limit: $event.pageSize,
        })

        this.repairService.getRepairs(
            {
                car: this.carId
            },
            {
                page: $event.pageIndex + 1,
                limit: $event.pageSize,
                sort: '-createdAt',
            },
        ).subscribe(() => {
        })

    }

}
