import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsLoginPage } from './settings-login.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsLoginPageRoutingModule {}
