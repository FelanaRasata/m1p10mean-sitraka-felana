import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRouting} from './app-routing';
import {AppComponent} from './app.component';
import {PublicModule} from "./modules/public/public.module";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "./modules/shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    PublicModule,
    SharedModule,

    MaterialModule,

    BrowserModule,
    AppRouting,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
