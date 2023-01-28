import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CarCardComponent } from './page/car-card/car-card.component'
import { RepairCardComponent } from './page/repair-card/repair-card.component'
import { RepairChoiceComponent } from './page/repair-choice/repair-choice.component'
import { RepairListComponent } from './page/repair-list/repair-list.component'
import { CarListComponent } from './page/car-list/car-list.component'
import { RepairPaymentComponent } from './page/repair-payment/repair-payment.component'
import { ComponentsModule } from '../../components/components.module'
import { SharedModule } from '../shared/shared.module'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'


@NgModule({
    declarations: [
        CarCardComponent,
        RepairCardComponent,
        RepairChoiceComponent,
        RepairListComponent,
        CarListComponent,
        RepairPaymentComponent,
    ],
    exports: [
        CarListComponent,
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        SharedModule,
        MatDialogModule,
        MatFormFieldModule
    ],
})
export class CustomerModule {
}
