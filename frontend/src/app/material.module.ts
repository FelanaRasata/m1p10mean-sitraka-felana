import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatPaginatorModule } from '@angular/material/paginator'


@NgModule({
    exports: [MatPaginatorModule],
    declarations: [],
    imports: [
        CommonModule,
    ],
})
export class MaterialModule {
}
