import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRouting } from './app-routing'
import { AppComponent } from './app.component'
import { PublicModule } from './modules/public/public.module'
import { FormsModule } from '@angular/forms'
import { SharedModule } from './modules/shared/shared.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { CustomerModule } from './modules/customer/customer.module'
import { LayoutModule } from './layout/layout.module'
import { WorkshopModule } from './modules/workshop/workshop.module'
import { FinancialModule } from './modules/financial/financial.module'


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        PublicModule,
        SharedModule,
        LayoutModule,

        BrowserModule,
        AppRouting,
        FormsModule,
        HttpClientModule,

        BrowserAnimationsModule,
        CustomerModule,
        WorkshopModule,
        FinancialModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
