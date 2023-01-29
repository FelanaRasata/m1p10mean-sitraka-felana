import { Component, Input } from '@angular/core'
import { IRepair } from '../../../shared/core/models/schemas/repairs.schema'

@Component({
  selector: 'app-diagnostic-table',
  templateUrl: './diagnostic-table.component.html',
  styleUrls: ['./diagnostic-table.component.scss']
})
export class DiagnosticTableComponent {
    @Input() repair = {} as IRepair
}
