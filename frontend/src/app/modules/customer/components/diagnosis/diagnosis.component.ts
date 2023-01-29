import { Component, Input } from '@angular/core'
import { RepairService } from '../../../shared/core/services/repair/repair.service'
import { BehaviorSubject } from 'rxjs'


@Component({
    selector: 'app-diagnosis',
    templateUrl: './diagnosis.component.html',
    styleUrls: ['./diagnosis.component.scss'],
})
export class DiagnosisComponent {

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

        console.log('>>>>>>>>>>>>>>>>>>', this.selectedList.value)

    }

}
