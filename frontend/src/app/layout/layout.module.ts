import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LayoutRouting } from './layout.routing'
import { LayoutComponent } from './layout.component'
import { ComponentsModule } from '../components/components.module'


@NgModule({
    declarations: [
        LayoutComponent,
    ],
    imports: [
        CommonModule,
        LayoutRouting,
        ComponentsModule,
    ]
})
export class LayoutModule {
}
