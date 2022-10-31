import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCommonModelPage } from './add-common-model.page';

const routes: Routes = [
  {
    path: '',
    component: AddCommonModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCommonModelPageRoutingModule {}
