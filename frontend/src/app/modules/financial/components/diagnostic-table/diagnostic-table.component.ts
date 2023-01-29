import { Component } from '@angular/core'
import { RepairService } from '../../../shared/core/services/repair/repair.service'


@Component({
  selector: 'app-diagnostic-table',
  templateUrl: './diagnostic-table.component.html',
  styleUrls: ['./diagnostic-table.component.scss']
})
export class DiagnosticTableComponent {
    constructor(
        public repairService: RepairService
    ) {
    }
}
