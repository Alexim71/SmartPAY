import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController  } from '@ionic/angular';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { PopoverController } from '@ionic/angular';
import { MoreOptionsComponent } from '../more-options/more-options.component';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.page.html',
  styleUrls: ['./payment-details.page.scss'],
})
export class PaymentDetailsPage implements OnInit {
  moreOptionVisible: boolean = false;
  transactionId: number = 0;
  // transaction: any;
  transactions: any[] = [];

  constructor(private route: ActivatedRoute, private alertController: AlertController, private modalController: ModalController, private popoverController: PopoverController ) { }

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


async performPayment(transaction: any) {
  const modal = await this.modalController.create({
    component: PaymentModalComponent,
    componentProps: {
      transaction: transaction, // Passer les détails de la transaction
    },
    cssClass: 'my-custom-modal', // Utiliser la classe CSS pour styliser le modal
    animated: true, // Activez les animations
      backdropDismiss: true 
  });

  await modal.present();
}

// Méthode pour ouvrir le menu 'More' avec Popover
async presentPopover(ev: any) {
  const popover = await this.popoverController.create({
    component: MoreOptionsComponent, // Le menu 'More' en tant que composant
    event: ev,
    translucent: true
  });
  return await popover.present();
}

showMoreOptionMenu(event: MouseEvent, activity: any) {
  this.moreOptionVisible = true;
  const target = event.currentTarget as HTMLElement;
 
}

@HostListener('document:click', ['$event'])
handleClickOutside(event: MouseEvent) {
  if (event.target instanceof HTMLElement && !event.target.closest('app-dropdown-menu')) {
    this.moreOptionVisible = false;
  }
}


  }

  
  


