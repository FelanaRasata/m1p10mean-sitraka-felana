import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StatisticsComponent } from './page/statistics/statistics.component'
import { RepairsPaidComponent } from './page/repairs-paid/repairs-paid.component'
import { RepairsInitiatedComponent } from './page/repairs-initiated/repairs-initiated.component'
import { RepairPaidComponent } from './page/repair-paid/repair-paid.component'
import { RepairInitiatedComponent } from './page/repair-initiated/repair-initiated.component'


@NgModule({
    declarations: [
        StatisticsComponent,
        RepairsPaidComponent,
        RepairsInitiatedComponent,
        RepairPaidComponent,
        RepairInitiatedComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class FinancialModule {
}
