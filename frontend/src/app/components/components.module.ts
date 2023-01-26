import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FooterComponent} from './footer/footer.component'
import {SidebarComponent} from './sidebar/sidebar.component'
import {TopbarComponent} from './topbar/topbar.component'
import {SharedModule} from '../modules/shared/shared.module'
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";


@NgModule({
    declarations: [
        FooterComponent,
        SidebarComponent,
        TopbarComponent,
    ],
    exports: [
        SidebarComponent,
        FooterComponent,
        TopbarComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FontAwesomeModule,
        BrowserModule,
        RouterModule
    ],
})
export class ComponentsModule {
}
