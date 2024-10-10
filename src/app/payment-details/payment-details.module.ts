import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentDetailsPageRoutingModule } from './payment-details-routing.module';

import { PaymentDetailsPage } from './payment-details.page';
import {PaymentModalComponent} from '../payment-modal/payment-modal.component'
import {DropdownMenuPaiementComponent} from '../dropdown-menu-paiement/dropdown-menu-paiement.component'
import {MoreOptionsPaymentComponent} from '../more-options-payment/more-options-payment.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentDetailsPageRoutingModule
  ],
  declarations: [PaymentDetailsPage, PaymentModalComponent, MoreOptionsPaymentComponent, DropdownMenuPaiementComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class PaymentDetailsPageModule {}
