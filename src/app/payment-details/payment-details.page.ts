import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController  } from '@ionic/angular';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.page.html',
  styleUrls: ['./payment-details.page.scss'],
})
export class PaymentDetailsPage implements OnInit {
  transactionId: number = 0;
  // transaction: any;
  transactions: any[] = [];

  constructor(private route: ActivatedRoute, private alertController: AlertController, private modalController: ModalController ) { }

  ngOnInit() {
    // Récupérer l'ID de la transaction à partir de l'URL
    this.transactionId = +this.route.snapshot.paramMap.get('transactionId')!;


     // Exemple de données fictives pour les transactions
     this.transactions = [
      {
        id: 1,
        quantity: 2,
        article: 'Ordinateur Portable',
        description: 'Ordinateur de bureau ultra-performant pour gaming et productivité.',
        unitPrice: 1500, // Prix unitaire
        totalPrice: 3000  // Quantité * Prix unitaire
      },
      {
        id: 2,
        quantity: 1,
        article: 'Souris Gamer',
        description: 'Souris ergonomique avec éclairage RGB.',
        unitPrice: 100,
        totalPrice: 100
      },
      {
        id: 3,
        quantity: 3,
        article: 'Clavier Mécanique',
        description: 'Clavier mécanique avec switchs RGB.',
        unitPrice: 120,
        totalPrice: 360
      }
    ];
    // Charger les détails de la transaction à partir de cet ID...
  }

  //  // Méthode pour effectuer le paiement
  //  async  performPayment(transaction: any) {
  //   // Logique pour effectuer le paiement ici.
  //   console.log('Paiement effectué avec succès.');

    

  //   // // Exemple : Affichage d'une alerte pour indiquer que le paiement a réussi
  //   // this.showPaymentSuccessAlert();

  //   const modal = await this.modalController.create({
  //     component: PaymentModalComponent,
  //     componentProps: { transaction: transaction } // Passer les détails de la transaction à la modal
  //   });
  //   return await modal.present();
  // }


//   async performPayment(transaction: any) {
//     const modal = await this.modalController.create({
//       component: PaymentModalComponent,
//       componentProps: { transaction: transaction },
//       cssClass: 'my-custom-modal', // Classe CSS personnalisée pour des styles supplémentaires
//       animated: true, // Activez les animations
//       backdropDismiss: true // Permet de fermer le modal en cliquant en dehors
//     });
//     return await modal.present();
// }


async performPayment(transaction: any) {
  const modal = await this.modalController.create({
    component: PaymentModalComponent,
    componentProps: {
      transaction: transaction, // Passer les détails de la transaction
    },
    cssClass: 'alert-modal-content', // Utiliser la classe CSS pour styliser le modal
  });

  await modal.present();
}



  }

  //  // Méthode pour afficher une alerte de succès
  //  async showPaymentSuccessAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Succès',
  //     message: 'Le paiement a été effectué avec succès.',
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }
  


