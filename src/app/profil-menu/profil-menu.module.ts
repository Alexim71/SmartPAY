import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilMenuPageRoutingModule } from './profil-menu-routing.module';

import { ProfilMenuPage } from './profil-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilMenuPageRoutingModule
  ],
  declarations: [ProfilMenuPage]
})
export class ProfilMenuPageModule {}
