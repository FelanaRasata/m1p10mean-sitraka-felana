import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CarDiagnosisComponent} from './page/car-diagnosis/car-diagnosis.component'
import {ExitTicketComponent} from './page/exit-ticket/exit-ticket.component'
import {RepairsFilteredComponent} from './page/repairs-filtered/repairs-filtered.component'
import {RepairInProgressComponent} from './page/repair-in-progress/repair-in-progress.component'
import {SharedModule} from "../shared/shared.module";
import { RepairTypeModalComponent } from './component/modals/repair-type-modal/repair-type-modal.component';
import { RepairTypeListComponent } from './component/others/repair-type-list/repair-type-list.component'


@NgModule({
    declarations: [
        CarDiagnosisComponent,
        ExitTicketComponent,
        RepairsFilteredComponent,
        RepairInProgressComponent,
        RepairTypeModalComponent,
        RepairTypeListComponent,

    ],
    imports: [
        CommonModule,
        SharedModule,
    ],
})
export class WorkshopModule {
}
