import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stripe, PaymentSheetEventsEnum} from '@capacitor-community/stripe';
import { first, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stripe-paiement',
  templateUrl: './stripe-paiement.page.html',
  styleUrls: ['./stripe-paiement.page.scss'],
})
export class StripePaiementPage implements OnInit {
  name!: string;
  email!: string;
  amount!: number;
  data: any = {};


  constructor(private http: HttpClient) {
    Stripe.initialize({
      publishableKey: environment.publishableKey,
    });
  }

  ngOnInit() {
  }

  async paymentSheet() {
    try {
      if (!this.name || !this.email || !this.amount) {
        return
      }
      this.data = {
        name: this.name,
        email: this.email,
        amount: this.amount * 100,
        currency: 'usd',
      }
      // be able to get event of PaymentSheet
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });

      // Connect to your backend endpoint, and get every key.
      const data$ = await this.httpPost(this.data);
      const { paymentIntent, customer, ephemeralKey } = await lastValueFrom(data$);
      // prepare PaymentSheet with CreatePaymentSheetOption.
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: "Trs"
      });

      // present PaymentSheet and get result.
      const result = await Stripe.presentPaymentSheet();
      console.log(result);
      if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
        // Happy path
      }
    } catch (error) {
      console.log( 'ERROR ALEXIMA'+ error);
    }
  }

  httpPost(body: any) {
    return this.http.post<any>(environment.api + 'payment-sheet', body).pipe(first());
  }

}
