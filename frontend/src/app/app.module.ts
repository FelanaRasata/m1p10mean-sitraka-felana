import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRouting } from './app-routing'
import { AppComponent } from './app.component'
import { PublicModule } from './modules/public/public.module'
import { FormsModule } from '@angular/forms'
import { SharedModule } from './modules/shared/shared.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module'
import { HttpClientModule } from '@angular/common/http'
import { CustomerModule } from './modules/customer/customer.module'
import {LayoutComponent} from "./layout/layout.component";
import {ComponentsModule} from "./components/components.module";
import {LayoutModule} from "./layout/layout.module";


@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
    ],
    imports: [
        PublicModule,
        SharedModule,

        ComponentsModule,
        LayoutModule,
        MaterialModule,

        BrowserModule,
        AppRouting,
        FormsModule,
        HttpClientModule,

        BrowserAnimationsModule,
        CustomerModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
