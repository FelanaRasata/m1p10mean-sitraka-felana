import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CarCardComponent } from './page/car-card/car-card.component'
import { RepairChoiceComponent } from './page/repair-choice/repair-choice.component'
import { RepairListComponent } from './page/repair-list/repair-list.component'
import { CarListComponent } from './page/car-list/car-list.component'
import { RepairPaymentComponent } from './page/repair-payment/repair-payment.component'
import { ComponentsModule } from '../../components/components.module'
import { SharedModule } from '../shared/shared.module'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { DiagnosisItemsTableComponent } from './components/tables/diagnosis-items-table/diagnosis-items-table.component'
import { CarCreationComponent } from './components/modals/car-creation/car-creation.component'
import { ReactiveFormsModule } from '@angular/forms'
import { SelectedItemsTableComponent } from './components/tables/selected-items-table/selected-items-table.component'
import { RouterLink } from '@angular/router'


@NgModule({
    declarations: [
        CarCardComponent,
        RepairChoiceComponent,
        RepairListComponent,
        CarListComponent,
        RepairPaymentComponent,
        DiagnosisItemsTableComponent,
        CarCreationComponent,
        SelectedItemsTableComponent,
    ],
    exports: [
        CarListComponent,
        DiagnosisItemsTableComponent,
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        SharedModule,
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        RouterLink,
    ],
})
export class CustomerModule {
}
