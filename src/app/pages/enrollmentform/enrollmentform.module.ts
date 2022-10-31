import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnrollmentformPageRoutingModule } from './enrollmentform-routing.module';

import { EnrollmentformPage } from './enrollmentform.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    EnrollmentformPageRoutingModule
  ],
  declarations: [EnrollmentformPage]
})
export class EnrollmentformPageModule {}
