import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentDetailsPageRoutingModule } from './payment-details-routing.module';

import { PaymentDetailsPage } from './payment-details.page';
import {PaymentModalComponent} from '../payment-modal/payment-modal.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentDetailsPageRoutingModule
  ],
  declarations: [PaymentDetailsPage, PaymentModalComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class PaymentDetailsPageModule {}
