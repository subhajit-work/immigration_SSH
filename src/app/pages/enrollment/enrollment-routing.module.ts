import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnrollmentPage } from './enrollment.page';

const routes: Routes = [
  {
    path: '',
    component: EnrollmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnrollmentPageRoutingModule {}
