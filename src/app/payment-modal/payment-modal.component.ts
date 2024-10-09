import { Component, OnInit,Input , ViewChild , ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';




register();

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent  implements OnInit {

  @Input() transaction: any;
  selectedOption: string | null = null;
  selectedPaymentMethod: string = '';

  @ViewChild('scrollTarget', { static: false }) scrollTarget !: ElementRef;

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




  constructor(private modalController: ModalController, private router: Router) {}

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
      this.selectedPaymentMethod = method;
      this.router.navigate(['stripe-paiement']);
      this.modalController.dismiss();

       // Attendre que la vue soit mise à jour avant de scroller
    // setTimeout(() => {
    //   if (this.scrollTarget) {
    //     this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //   }
    // }, 100);
    }

     // Choix de l'option
  chooseOption(option: string) {
    this.selectedOption = option;
  }

 

}
