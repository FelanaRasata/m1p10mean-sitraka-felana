import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotFoundComponent} from './page/not-found/not-found.component';
import {FormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";
import {SignInComponent} from './page/sign-in/sign-in.component';
import {SignUpComponent} from './page/sign-up/sign-up.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    SignInComponent,
    SignUpComponent
  ],
  exports: [
    NotFoundComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule
  ]
})
export class PublicModule {
}
