import { Component } from '@angular/core'
import { RepairService } from '../../../shared/core/services/repair/repair.service'


@Component({
    selector: 'app-repair-choice',
    templateUrl: './repair-choice.component.html',
    styleUrls: ['./repair-choice.component.scss'],
})
export class RepairChoiceComponent {


    constructor(
        public repairService: RepairService
    ) {
    }
}
