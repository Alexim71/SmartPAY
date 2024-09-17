import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilMenuPage } from './profil-menu.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilMenuPageRoutingModule {}
