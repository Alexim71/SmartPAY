import { Component, OnInit,Input  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';




register();

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent  implements OnInit {

  @Input() transaction: any;
  selectedOption: string | null = null;

  // Options du slide avec autoplay
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 3000,  // Délai en millisecondes entre chaque slide
      disableOnInteraction: false
    }
  };

  // Liste des méthodes de paiement avec icônes
  paymentMethods = [
    { value: 'credit-card', label: 'Carte de Crédit', icon: 'card-outline' },
    { value: 'paypal', label: 'PayPal', icon: 'logo-paypal' },
    { value: 'bank-transfer', label: 'Virement Bancaire', icon: 'cash-outline' }
  ];




  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

   // Slide changé (facultatif pour des actions spécifiques)
   slideChanged() {
    // Logique après chaque changement de slide, si nécessaire
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

    selectPaymentMethod(method: string) {
      console.log('Méthode de paiement sélectionnée :', method);
      // Logique pour traiter la méthode de paiement sélectionnée
    }

     // Choix de l'option
  chooseOption(option: string) {
    this.selectedOption = option;
  }

 

}
