import { Component } from '@angular/core'
import { RepairService } from '../../../shared/core/services/repair/repair.service'


@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
    constructor(
        public repairService: RepairService
    ) {
    }
}
