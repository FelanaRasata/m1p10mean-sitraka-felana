import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';



@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    TopbarComponent
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
