import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FooterComponent } from './footer/footer.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { TopbarComponent } from './topbar/topbar.component'
import { SharedModule } from '../modules/shared/shared.module'


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
    ],
})
export class ComponentsModule {
}
