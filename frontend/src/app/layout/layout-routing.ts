import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RedirectGuard } from '../modules/shared/core/guards/redirect/redirect.guard'
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
import { LayoutComponent } from './layout.component'
import { AuthenticationGuard } from '../modules/public/core/guards/authentication/authentication.guard'
import { DataStorageResolver } from '../modules/shared/core/resolver/data-storage/data-storage.resolver'


const routes: Routes = [
    {
        path: '',
        resolve: {data: DataStorageResolver},
        component: LayoutComponent,
        canActivateChild: [AuthenticationGuard],
        children: [
            {
                path: 'customer',
                canActivateChild: [RedirectGuard],
                children: [
                    {
                        path: '',
                        redirectTo: 'car_list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'car_list',
                        /*resolve: {
                            data: CarListResolver,
                        },*/
                        component: CarListComponent,
                    },
                    {
                        path: 'car_card',
                        resolve: {},
                        component: CarCardComponent,
                    },
                    {
                        path: 'repair_list',
                        resolve: {},
                        component: RepairListComponent,
                    },
                    {
                        path: 'repair_card',
                        resolve: {},
                        component: RepairCardComponent,
                    },
                    {
                        path: 'repair_choice',
                        resolve: {},
                        component: RepairChoiceComponent,
                    },
                    {
                        path: 'repair_payment',
                        resolve: {},
                        component: RepairPaymentComponent,
                    },
                    {
                        path: '**',
                        redirectTo: '',
                    },
                ],
            },
            {
                path: 'financial',
                canActivateChild: [RedirectGuard],
                children: [
                    {
                        path: '',
                        redirectTo: 'statistics',
                        pathMatch: 'full',
                    },
                    {
                        path: 'statistics',
                        resolve: {},
                        component: StatisticsComponent,
                    },
                    {
                        path: 'repairs_initiated',
                        resolve: {},
                        component: RepairsInitiatedComponent,
                    },
                    {
                        path: 'repair_initiated',
                        resolve: {},
                        component: RepairInitiatedComponent,
                    },
                    {
                        path: 'repairs_paid',
                        resolve: {},
                        component: RepairsPaidComponent,
                    },
                    {
                        path: 'repair_paid',
                        resolve: {},
                        component: RepairPaidComponent,
                    },
                    {
                        path: '**',
                        redirectTo: '',
                    },
                ],
            },
            {
                path: 'workshop',
                canActivateChild: [RedirectGuard],
                children: [
                    {
                        path: '',
                        redirectTo: 'filtered_repairs',
                        pathMatch: 'full',
                    },
                    {
                        path: 'filtered_repairs',
                        resolve: {},
                        component: RepairsFilteredComponent,
                    },
                    {
                        path: 'car_diagnosis',
                        resolve: {},
                        component: CarDiagnosisComponent,
                    },
                    {
                        path: 'repair_in_progress',
                        resolve: {},
                        component: RepairInProgressComponent,
                    },
                    {
                        path: 'exit_ticket',
                        resolve: {},
                        component: ExitTicketComponent,
                    },
                    {
                        path: '**',
                        redirectTo: '',
                    },

                ],
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
