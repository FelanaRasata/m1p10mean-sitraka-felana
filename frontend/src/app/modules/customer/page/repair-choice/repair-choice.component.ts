import { Component } from '@angular/core'
import { RepairService } from '../../../shared/core/services/repair/repair.service'
import { BehaviorSubject } from 'rxjs'


@Component({
    selector: 'app-repair-choice',
    templateUrl: './repair-choice.component.html',
    styleUrls: ['./repair-choice.component.scss'],
})
export class RepairChoiceComponent {

    selectedList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])


    constructor(
        public repairService: RepairService,
    ) {
    }
}
