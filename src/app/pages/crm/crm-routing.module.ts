import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrmPage } from './crm.page';

const routes: Routes = [
  {
    path: '',
    component: CrmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmPageRoutingModule {}
