import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './page/registration/registration.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { LoginComponent } from './page/login/login.component';
import {FormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";



@NgModule({
  declarations: [
    RegistrationComponent,
    NotFoundComponent,
    LoginComponent
  ],
    exports: [
        LoginComponent,
        RegistrationComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule
    ]
})
export class PublicModule { }
