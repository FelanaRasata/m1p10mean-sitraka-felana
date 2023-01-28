import { Component } from '@angular/core'
import { RepairService } from '../../../core/services/repair/repair.service'


@Component({
  selector: 'app-repair-item',
  templateUrl: './repair-item.component.html',
  styleUrls: ['./repair-item.component.scss']
})
export class RepairItemComponent {
    constructor(
        public repairService: RepairService
    ) {
    }
}
