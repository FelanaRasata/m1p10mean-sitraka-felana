import { Component, Input } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { RepairService } from '../../../../shared/core/services/repair/repair.service'


@Component({
    selector: 'app-diagnosis-items-table',
    templateUrl: './diagnosis-items-table.component.html',
    styleUrls: ['./diagnosis-items-table.component.scss'],
})
export class DiagnosisItemsTableComponent {

    @Input('title') title: string = ''

    @Input('selected_list') selectedList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])


    constructor(
        public repairService: RepairService,
    ) {
    }


    updateSelectedList(item: string) {

        const selectedItem = this.selectedList.value.find(i => i === item)

        if (selectedItem) {

            this.selectedList.value.splice(this.selectedList.value.indexOf(selectedItem))

        } else {

            this.selectedList.value.push(item)

        }

    }

}
