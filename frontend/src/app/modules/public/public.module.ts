import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './page/registration/registration.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { LoginComponent } from './page/login/login.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    RegistrationComponent,
    NotFoundComponent,
    LoginComponent
  ],
  exports: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PublicModule { }
