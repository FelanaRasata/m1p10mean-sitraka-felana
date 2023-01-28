import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CarsTableComponent} from './components/tables/cars-table/cars-table.component'
import {RepairsTableComponent} from './components/tables/repairs-table/repairs-table.component'
import {PaginatorComponent} from './components/others/paginator/paginator.component'
import {SignOutModalComponent} from './components/modals/sign-out-modal/sign-out-modal.component'
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {TokenInterceptor} from './core/interceptor/token/token.interceptor'
import {MatPaginatorModule} from "@angular/material/paginator";
import { GeneralErrorHandlerInterceptor } from './core/interceptor/error/general-error-handler.interceptor'
import { CarItemComponent } from './components/others/car-item/car-item.component';
import { RepairItemComponent } from './components/others/repair-item/repair-item.component';
import { RepairDiagnoItemComponent } from './components/others/repair-diagno-item/repair-diagno-item.component';


@NgModule({
    declarations: [
        CarsTableComponent,
        RepairsTableComponent,
        PaginatorComponent,
        SignOutModalComponent,
        CarItemComponent,
        RepairItemComponent,
        RepairDiagnoItemComponent,
    ],
    exports: [
        CarsTableComponent,
        SignOutModalComponent,
        RepairsTableComponent,
        CarItemComponent,
        RepairItemComponent,
        RepairDiagnoItemComponent,
    ],
    imports: [
        MatPaginatorModule,
        CommonModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: GeneralErrorHandlerInterceptor,
          multi: true
        },
    ]
})
export class SharedModule {
}
