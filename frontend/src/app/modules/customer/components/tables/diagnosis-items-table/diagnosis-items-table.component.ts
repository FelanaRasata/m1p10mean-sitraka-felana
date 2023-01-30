import { Component, Input } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { RepairService } from '../../../../shared/core/services/repair/repair.service'
import { IRepairTypeTemp } from '../../../../shared/core/models/schemas/repairs.schema'
import { ICarDiagnosisItem } from '../../../../shared/core/models/schemas/car-diagnosis.schema'


@Component({
    selector: 'app-diagnosis-items-table',
    templateUrl: './diagnosis-items-table.component.html',
    styleUrls: ['./diagnosis-items-table.component.scss'],
})
export class DiagnosisItemsTableComponent {

    @Input('title') title: string = ''

    @Input('selected_list') selectedList: BehaviorSubject<IRepairTypeTemp[]> = new BehaviorSubject<IRepairTypeTemp[]>([])


    constructor(
        public repairService: RepairService,
    ) {
    }


    updateSelectedList(item: ICarDiagnosisItem) {

        const selectedItem = this.selectedList.value.find(i => i.repairType === item.repairType._id)

        if (selectedItem) {

            this.selectedList.value.splice(this.selectedList.value.indexOf(selectedItem))

        } else {

            const temp = {
                repairType: item.repairType._id,

                quantity: item.quantity
            }

            this.selectedList.value.push(temp)

        }

    }

}
