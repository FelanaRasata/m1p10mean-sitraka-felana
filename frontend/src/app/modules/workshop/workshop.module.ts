import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CarDiagnosisComponent } from './page/car-diagnosis/car-diagnosis.component'
import { ExitTicketComponent } from './page/exit-ticket/exit-ticket.component'
import { RepairsFilteredComponent } from './page/repairs-filtered/repairs-filtered.component'
import { RepairInProgressComponent } from './page/repair-in-progress/repair-in-progress.component'
import { SharedModule } from '../shared/shared.module'
import { RepairTypeModalComponent } from './component/modals/repair-type-modal/repair-type-modal.component'
import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatTabsModule } from '@angular/material/tabs'
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop'


@NgModule({
    declarations: [
        CarDiagnosisComponent,
        ExitTicketComponent,
        RepairsFilteredComponent,
        RepairInProgressComponent,
        RepairTypeModalComponent,

    ],
    imports: [
        CommonModule,
        SharedModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        CdkDropList,
        CdkDrag,
    ],
})
export class WorkshopModule {
}
