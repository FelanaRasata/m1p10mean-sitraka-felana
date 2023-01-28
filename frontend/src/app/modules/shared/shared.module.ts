import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CarsTableComponent} from './components/tables/cars-table/cars-table.component'
import {RepairsTableComponent} from './components/tables/repairs-table/repairs-table.component'
import {PaginatorComponent} from './components/others/paginator/paginator.component'
import {SignOutModalComponent} from './components/modals/sign-out-modal/sign-out-modal.component'
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {TokenInterceptor} from './core/interceptor/token/token.interceptor'
import {MatPaginatorModule} from "@angular/material/paginator";
import { GeneralErrorHandlerInterceptor } from './core/interceptor/error/general_error_handler.interceptor'
import { CarItemComponent } from './components/others/car-item/car-item.component';
import { RepairItemComponent } from './components/others/repair-item/repair-item.component';
import { RepairTypeListComponent } from './components/others/repair-type-list/repair-type-list.component';


@NgModule({
    declarations: [
        CarsTableComponent,
        RepairsTableComponent,
        PaginatorComponent,
        SignOutModalComponent,
        CarItemComponent,
        RepairItemComponent,
        RepairTypeListComponent,
    ],
    exports: [
        CarsTableComponent,
        SignOutModalComponent,
        RepairsTableComponent,
        CarItemComponent,
        RepairItemComponent,
        RepairTypeListComponent,
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
