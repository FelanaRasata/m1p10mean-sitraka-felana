import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {LayoutRouting} from './layout-routing'
import {ComponentsModule} from "../components/components.module";


@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        LayoutRouting,
    ],
})
export class LayoutModule {
}
