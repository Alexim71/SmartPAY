import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController  } from '@ionic/angular';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { PopoverController } from '@ionic/angular';
import { MoreOptionsComponent } from '../more-options/more-options.component';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component'; // Menu déroulant


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

  searchQuery: string = ''; // Chaîne de recherche pour la recherche d'activités
  selectedFilter: string = ''; // Filtre sélectionné
  selectedSort: string = 'date-asc'; // Tri par défaut : Date croissante
  sortBy: string = 'date'; // Par défaut, trier par date
  showFilter: boolean = false;
  selectedDate: string = '';  // Stocker la date sélectionnée
  selectedActivity: any = null;
  dropdownVisible: boolean = false;
  clickedItem: any = null;


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
        totalPrice: 3000,  // Quantité * Prix unitaire
        date: new Date('2024-09-10')
      },
      {
        id: 2,
        quantity: 1,
        article: 'Souris Gamer',
        description: 'Souris ergonomique avec éclairage RGB.',
        unitPrice: 100,
        totalPrice: 100,
        date: new Date('2025-09-10')
      },
      {
        id: 3,
        quantity: 3,
        article: 'Clavier Mécanique',
        description: 'Clavier mécanique avec switchs RGB.',
        unitPrice: 120,
        totalPrice: 360,
        date: new Date('2020-09-10')
      }
    ];
    // Charger les détails de la transaction à partir de cet ID...

    
  }


  filteredActivities: any[] = [...this.transactions];

   // Méthode pour activer/désactiver les filtres (à implémenter)
   toggleFilter() {
    this.filterActivities();  // Ajoutez la logique de filtre ici si nécessaire
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
// async presentPopover(ev: any) {
//   const popover = await this.popoverController.create({
//     component: MoreOptionsComponent, // Le menu 'More' en tant que composant
//     event: ev,
//     translucent: true
//   });
//   return await popover.present();
// }

async presentPopover(event: Event, activity: any) {
  const popover = await this.popoverController.create({
    component: DropdownMenuComponent, // Le composant pour le menu
    event: event,
    translucent: false,
    componentProps: { activity: activity }, // Passer l'activity au menu déroulant
    cssClass: 'custom-popover-position', // Classe personnalisée pour le style
  });
  console.log('MORE clicked')
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


sortActivities() {
  this.filteredActivities.sort((a, b) => {
    let comparison = 0;

    switch (this.selectedSort) {
      case 'date-asc':
        comparison = a.date.getTime() - b.date.getTime(); // Date croissante
        break;
      case 'date-desc':
        comparison = b.date.getTime() - a.date.getTime(); // Date décroissante
        break;
      case 'name-asc':
        comparison = a.article.localeCompare(b.article); // Nom croissant (A-Z)
        break;
      case 'name-desc':
        comparison = b.article.localeCompare(a.article); // Nom décroissant (Z-A)
        break;
      default:
        break;
    }

    return comparison;
  });

}

filterActivities() {
  const today = new Date();

  // Filtrer par recherche d'activité
  let filtered = this.transactions.filter(activity => {
    return (
      activity.article.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      activity.transactionId.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  });

  // Filtrer selon le filtre sélectionné
  if (this.selectedFilter) {
    switch (this.selectedFilter) {
      case 'overdue':
        filtered = filtered.filter(activity => activity.date < today);
        break;
      case 'due-date':
        filtered = filtered.filter(activity => activity.date >= today);
        break;
      case 'next-7-days':
        const next7Days = new Date();
        next7Days.setDate(today.getDate() + 7);
        filtered = filtered.filter(activity => activity.date >= today && activity.date <= next7Days);
        break;
      case 'next-30-days':
        const next30Days = new Date();
        next30Days.setDate(today.getDate() + 30);
        filtered = filtered.filter(activity => activity.date >= today && activity.date <= next30Days);
        break;
      case 'next-3-months':
        const next3Months = new Date();
        next3Months.setMonth(today.getMonth() + 3);
        filtered = filtered.filter(activity => activity.date >= today && activity.date <= next3Months);
        break;
      case 'next-6-months':
        const next6Months = new Date();
        next6Months.setMonth(today.getMonth() + 6);
        filtered = filtered.filter(activity => activity.date >= today && activity.date <= next6Months);
        break;
      default:
        break;
    }
  }

  // Mettre à jour la liste des activités filtrées
  this.filteredActivities = filtered;
  this.sortActivities(); 

}

toggleSort() {
  // Alterner entre tri par date et tri par nom
  if (this.sortBy === 'date') {
    this.sortBy = 'name';
  } else {
    this.sortBy = 'date';
  }
  this.sortActivities(); // Appliquer le tri
}


  }

  
  


