import { Component } from '@angular/core'
import { RepairTypeService } from '../../../core/services/repair-type/repair-type.service'
import { MatDialog } from '@angular/material/dialog'
import { PaginationService } from '../../../core/services/pagination/pagination.service'
import { IRepairType } from '../../../core/models/schemas/repair_types.schema'
import {
    RepairTypeModalComponent
} from '../../../../workshop/component/modals/repair-type-modal/repair-type-modal.component'
import { PageEvent } from '@angular/material/paginator'
import { ICarDiagnosis, ICarDiagnosisItem } from '../../../core/models/schemas/car-diagnosis.schema'


@Component({
    selector: 'app-repair-types-table',
    templateUrl: './repair-types-table.component.html',
    styleUrls: ['./repair-types-table.component.scss']
})
export class RepairTypesTableComponent {

    carDiagnosis = {} as ICarDiagnosis


    constructor(
        public repairTypeService: RepairTypeService,
        private dialog: MatDialog,
        public paginationService: PaginationService
    ) {
    }


    addRepairType(repairType: IRepairType) {
        this.repairTypeService.createRepairType(repairType)
    }


    openModalAdd() {
        this.dialog.open(RepairTypeModalComponent)
    }


    setPage($event: PageEvent): void {

        this.repairTypeService.repairTypes.next([])

        this.paginationService.paginationData.next({
            ...this.paginationService.paginationData.value,
            page: $event.pageIndex + 1,
            limit: $event.pageSize,
        })

        this.repairTypeService.getRepairTypes(
            {
                page: $event.pageIndex + 1,
                limit: $event.pageSize,
                sort: 'name',
            },
        ).subscribe(() => {
        })

    }


    addRepairItem(repairType: IRepairType) {
        let repairTypeItem = {} as ICarDiagnosisItem;
    }
}
