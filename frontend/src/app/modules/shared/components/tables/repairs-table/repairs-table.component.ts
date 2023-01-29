import { Component, Input } from '@angular/core'
import { RepairService } from '../../../core/services/repair/repair.service'
import { PaginationService } from '../../../core/services/pagination/pagination.service'
import { PageEvent } from '@angular/material/paginator'
import { SessionService } from '../../../core/services/session/session.service'
import { EUserType } from '../../../core/models/global/static_enums'


@Component({
    selector: 'app-repairs-table',
    templateUrl: './repairs-table.component.html',
    styleUrls: ['./repairs-table.component.scss'],
})
export class RepairsTableComponent {
    @Input('title') title: string = ''

    @Input('car_id') carId: string = ''

    @Input('card_url_path') cardUrlPath: string | null = null


    financial = EUserType.FIM
    customer = EUserType.CUS

    constructor(
        public repairService: RepairService,
        public paginationService: PaginationService,
        public sessionService: SessionService,
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
