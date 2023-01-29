import { Component } from '@angular/core'
import { RepairTypeService } from '../../../../shared/core/services/repair-type/repair-type.service'
import { IRepairType } from '../../../../shared/core/models/schemas/repair_types.schema'


@Component({
    selector: 'app-repair-type-list',
    templateUrl: './repair-type-list.component.html',
    styleUrls: ['./repair-type-list.component.scss']
})
export class RepairTypeListComponent {
    constructor(
        public repairTypeService: RepairTypeService
    ) {
    }

    addRepairType(repairType: IRepairType){

    }
}
