import { Component, Input } from '@angular/core'
import { RepairService } from '../../../shared/core/services/repair/repair.service'
import { PaginationService } from '../../../shared/core/services/pagination/pagination.service'


@Component({
    selector: 'app-diagnosis',
    templateUrl: './diagnosis.component.html',
    styleUrls: ['./diagnosis.component.scss'],
})
export class DiagnosisComponent {

    @Input('title') title: string = ''


    constructor(
        public repairService: RepairService,
    ) {
    }
}
