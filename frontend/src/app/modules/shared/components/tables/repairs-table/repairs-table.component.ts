import {Component, Input} from '@angular/core'
import {RepairService} from "../../../core/services/repair/repair.service";


@Component({
    selector: 'app-repairs-table',
    templateUrl: './repairs-table.component.html',
    styleUrls: ['./repairs-table.component.scss'],
})
export class RepairsTableComponent {
    @Input('title') title: string = '';

    constructor(
        public repairService : RepairService
    ) {
    }
}
