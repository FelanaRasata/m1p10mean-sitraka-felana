import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarDiagnosisComponent} from './page/car-diagnosis/car-diagnosis.component';
import {ExitTicketComponent} from './page/exit-ticket/exit-ticket.component';
import {RepairsFilteredComponent} from './page/repairs-filtered/repairs-filtered.component';
import {RepairInProgressComponent} from './page/repair-in-progress/repair-in-progress.component';


@NgModule({
  declarations: [
    CarDiagnosisComponent,
    ExitTicketComponent,
    RepairsFilteredComponent,
    RepairInProgressComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WorkshopModule { }
