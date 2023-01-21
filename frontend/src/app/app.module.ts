import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRouting} from './app-routing';
import {AppComponent} from './app.component';
import {PublicModule} from "./modules/public/public.module";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "./modules/shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    PublicModule,
    SharedModule,

    BrowserModule,
    AppRouting,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
