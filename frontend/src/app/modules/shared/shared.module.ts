import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CarsTableComponent } from './components/tables/cars-table/cars-table.component'
import { RepairsTableComponent } from './components/tables/repairs-table/repairs-table.component'
import { PaginatorComponent } from './components/others/paginator/paginator.component'
import { MaterialModule } from '../../material.module'
import { SignOutModalComponent } from './components/modals/sign-out-modal/sign-out-modal.component'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { TokenInterceptor } from './core/interceptor/token/token.interceptor'


@NgModule({
    declarations: [
        CarsTableComponent,
        RepairsTableComponent,
        PaginatorComponent,
        SignOutModalComponent,
    ],
    exports: [
        CarsTableComponent,
        SignOutModalComponent,
    ],
    imports: [
        MaterialModule,
        CommonModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})
export class SharedModule {
}
