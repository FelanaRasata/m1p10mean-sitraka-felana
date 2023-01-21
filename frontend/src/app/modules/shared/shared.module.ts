import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsTableComponent } from './components/tables/cars-table/cars-table.component';



@NgModule({
  declarations: [
    CarsTableComponent
  ],
  exports: [
    CarsTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
