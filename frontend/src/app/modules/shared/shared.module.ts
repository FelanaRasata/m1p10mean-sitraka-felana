import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsTableComponent } from './components/tables/cars-table/cars-table.component';
import { RepairsTableComponent } from './components/tables/repairs-table/repairs-table.component';
import { PaginatorComponent } from './components/others/paginator/paginator.component';
import {MaterialModule} from "../../material.module";



@NgModule({
  declarations: [
    CarsTableComponent,
    RepairsTableComponent,
    PaginatorComponent
  ],
  exports: [
    CarsTableComponent
  ],
  imports: [
    MaterialModule,
    CommonModule
  ]
})
export class SharedModule { }
