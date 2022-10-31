import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NgCircleProgressModule.forRoot(),
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
