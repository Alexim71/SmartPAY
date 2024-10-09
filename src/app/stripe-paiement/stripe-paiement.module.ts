import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StripePaiementPageRoutingModule } from './stripe-paiement-routing.module';

import { StripePaiementPage } from './stripe-paiement.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StripePaiementPageRoutingModule,
    HttpClientModule
  ],
  declarations: [StripePaiementPage]
})
export class StripePaiementPageModule {}
