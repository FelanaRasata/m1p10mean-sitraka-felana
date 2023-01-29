import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CarListComponent } from '../modules/customer/page/car-list/car-list.component'
import { CarCardComponent } from '../modules/customer/page/car-card/car-card.component'
import { RepairListComponent } from '../modules/customer/page/repair-list/repair-list.component'
import { RepairChoiceComponent } from '../modules/customer/page/repair-choice/repair-choice.component'
import { RepairPaymentComponent } from '../modules/customer/page/repair-payment/repair-payment.component'
import { RepairCardComponent } from '../modules/customer/page/repair-card/repair-card.component'
import { StatisticsComponent } from '../modules/financial/page/statistics/statistics.component'
import { RepairsInitiatedComponent } from '../modules/financial/page/repairs-initiated/repairs-initiated.component'
import { RepairInitiatedComponent } from '../modules/financial/page/repair-initiated/repair-initiated.component'
import { RepairsPaidComponent } from '../modules/financial/page/repairs-paid/repairs-paid.component'
import { RepairPaidComponent } from '../modules/financial/page/repair-paid/repair-paid.component'
import { RepairsFilteredComponent } from '../modules/workshop/page/repairs-filtered/repairs-filtered.component'
import { CarDiagnosisComponent } from '../modules/workshop/page/car-diagnosis/car-diagnosis.component'
import { RepairInProgressComponent } from '../modules/workshop/page/repair-in-progress/repair-in-progress.component'
import { ExitTicketComponent } from '../modules/workshop/page/exit-ticket/exit-ticket.component'
import { CarListResolver } from '../modules/customer/core/resolver/car-list/car-list.resolver'
import { CarCardResolver } from '../modules/customer/core/resolver/car-card/car-card.resolver'
import { RepairTypeListResolver } from '../modules/workshop/core/resolver/repair-type-list/repair-type-list.resolver'
import { RepairListResolver } from '../modules/workshop/core/resolver/repair-list/repair-list.resolver'
import { RepairResolver } from '../modules/shared/core/resolver/repair/repair.resolver'
import { DiagnosisResolver } from '../modules/customer/core/resolver/diagnosis/diagnosis.resolver'
import {
    RepairsInitiatedResolver
} from '../modules/financial/core/resolver/repairs-initiated/repairs-initiated.resolver'
import {
    CustomerRepairInProgressResolver
} from '../modules/customer/core/resolver/customer-repair-in-progress/customer-repair-in-progress.resolver'


const routes: Routes = [
    {
        path: 'customer',
        children: [
            {
                path: '',
                redirectTo: 'cars',
                pathMatch: 'full',
            },
            {
                path: 'cars',
                resolve: {
                    data: CarListResolver,
                },
                component: CarListComponent,
            },
            {
                path: 'cars/:car_id',
                resolve: {data: CarCardResolver},
                component: CarCardComponent,
            },
            {
                path: 'repairs',
                resolve: {
                    data: CustomerRepairInProgressResolver
                } ,
                component: RepairListComponent,
            },
            {
                path: 'repairs/:repair_id',
                resolve: {
                    data: RepairResolver
                } ,
                component: RepairCardComponent,
            },
            {
                path: 'repairs/:repair_id/selection',
                resolve: {data: DiagnosisResolver},
                component: RepairChoiceComponent,
            },
            {
                path: 'repairs/:repair_id/pay',
                component: RepairPaymentComponent,
            },
        ],
    },
    {
        path: 'financial',
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                component: StatisticsComponent,
            },
            {
                path: 'repairs/initiated',
                resolve: {
                    data: RepairsInitiatedResolver
                },
                component: RepairsInitiatedComponent,
            },
            {
                path: 'repair/:repair_id/initiated',
                resolve: {
                    data: RepairResolver
                },
                component: RepairInitiatedComponent,
            },
            {
                path: 'repairs/paid',
                component: RepairsPaidComponent,
            },
            {
                path: 'repair/:repair_id/paid',
                component: RepairPaidComponent,
            },
        ],
    },
    {
        path: 'workshop',
        children: [
            {
                path: '',
                redirectTo: 'repairs',
                pathMatch: 'full',
            },
            {
                path: 'repairs',
                resolve: {
                    data: RepairListResolver,
                },
                component: RepairsFilteredComponent,
            },
            {
                path: 'car/:repair_id/diagnosis',
                resolve: {
                    data: RepairTypeListResolver,
                    repair: RepairResolver
                },
                component: CarDiagnosisComponent,
            },
            {
                path: 'repair/:repair_id/in_progress',
                resolve: {
                    repair: RepairResolver
                },
                component: RepairInProgressComponent,
            },
            {
                path: 'repair/:repair_id/exit',
                component: ExitTicketComponent,
            },
        ],
    },
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRouting {
}
