import { Component, OnInit,Input  } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent  implements OnInit {

  @Input() transaction: any;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

  // // Exemple de méthode pour envoyer le lien de paiement
  // sendPaymentLink() {
  //   const paymentLink = 'https://payment-gateway.example.com/pay?amount=' + this.transaction.finalTotal;
  //   console.log('Lien de paiement :', paymentLink);
  //   // Vous pouvez ajouter ici la logique pour envoyer le lien à l'utilisateur
  // }

  confirmPayment() {
    console.log('Paiement confirmé pour la transaction :', this.transaction.id);
    // Logique pour effectuer le paiement
    this.closeModal();
  }

    // Exemple de méthode pour envoyer le lien de paiement
    sendPaymentLink() {
      const paymentLink = 'https://payment-gateway.example.com/pay?amount=' + this.transaction.finalTotal;
      console.log('Lien de paiement :', paymentLink);
      // Vous pouvez ajouter ici la logique pour envoyer le lien à l'utilisateur
    }
 

}
