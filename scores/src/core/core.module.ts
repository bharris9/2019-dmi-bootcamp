import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PageHeaderComponent, HomeComponent],
  exports: [PageHeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }
