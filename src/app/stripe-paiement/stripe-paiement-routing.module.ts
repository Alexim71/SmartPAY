import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StripePaiementPage } from './stripe-paiement.page';

const routes: Routes = [
  {
    path: '',
    component: StripePaiementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StripePaiementPageRoutingModule {}
