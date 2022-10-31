import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCommonModelPageRoutingModule } from './add-common-model-routing.module';

import { AddCommonModelPage } from './add-common-model.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AddCommonModelPageRoutingModule
  ],
  declarations: [AddCommonModelPage]
})
export class AddCommonModelPageModule {}
