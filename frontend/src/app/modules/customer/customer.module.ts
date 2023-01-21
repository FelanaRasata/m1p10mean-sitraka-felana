import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './page/cars/cars.component';
import { CarDroppedOffAtComponent } from './page/car-dropped-off-at/car-dropped-off-at.component';



@NgModule({
  declarations: [
    CarsComponent,
    CarDroppedOffAtComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CustomerModule { }
