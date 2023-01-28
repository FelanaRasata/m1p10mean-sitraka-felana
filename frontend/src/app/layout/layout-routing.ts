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
import { CarListResolver } from '../modules/customer/core/resolver/car-list/car-list.resolver'


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
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
                        resolve: {
                          data : CarListResolver
                        },
                        component: CarListComponent,
                    },
                    {
                        path: 'car_card',
                        component: CarCardComponent,
                    },
                    {
                        path: 'repair_list',
                        component: RepairListComponent,
                    },
                    {
                        path: 'repair_card',
                        component: RepairCardComponent,
                    },
                    {
                        path: 'repair_choice',
                        component: RepairChoiceComponent,
                    },
                    {
                        path: 'repair_payment',
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
                        component: StatisticsComponent,
                    },
                    {
                        path: 'repairs_initiated',
                        component: RepairsInitiatedComponent,
                    },
                    {
                        path: 'repair_initiated',
                        component: RepairInitiatedComponent,
                    },
                    {
                        path: 'repairs_paid',
                        component: RepairsPaidComponent,
                    },
                    {
                        path: 'repair_paid',
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
                        component: RepairsFilteredComponent,
                    },
                    {
                        path: 'car_diagnosis',
                        component: CarDiagnosisComponent,
                    },
                    {
                        path: 'repair_in_progress',
                        component: RepairInProgressComponent,
                    },
                    {
                        path: 'exit_ticket',
                        component: ExitTicketComponent,
                    },
                    {
                        path: '**',
                        redirectTo: '',
                    },

                ],
            },
            {
                path: '**',
                redirectTo: '',
            },
        ],
        canActivateChild: [AuthenticationGuard],
    },
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRouting {
}
