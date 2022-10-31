import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NgCircleProgressModule.forRoot(),
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
