import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsLoginPageRoutingModule } from './settings-login-routing.module';

import { SettingsLoginPage } from './settings-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsLoginPageRoutingModule
  ],
  declarations: [SettingsLoginPage]
})
export class SettingsLoginPageModule {}
