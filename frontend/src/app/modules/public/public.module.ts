import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NotFoundComponent } from './page/not-found/not-found.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ComponentsModule } from '../../components/components.module'
import { SignInComponent } from './page/sign-in/sign-in.component'
import { SignUpComponent } from './page/sign-up/sign-up.component'
import { SharedModule } from '../shared/shared.module'
import { RouterLink } from '@angular/router'


@NgModule({
    declarations: [
        NotFoundComponent,
        SignInComponent,
        SignUpComponent,
    ],
    exports: [
        NotFoundComponent,
        SignInComponent,
        SignUpComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        SharedModule,
        ReactiveFormsModule,
        RouterLink,
    ],
})
export class PublicModule {
}
