import { Component, OnInit, HostListener } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component'; // Menu déroulant

@Component({
  selector: 'app-transactions-card',
  templateUrl: './transactions-card.component.html',
  styleUrls: ['./transactions-card.component.scss'],
})
export class TransactionsCardComponent  implements OnInit {
  
  ngOnInit() {}

  searchQuery: string = ''; // Chaîne de recherche pour la recherche d'activités
  selectedFilter: string = ''; // Filtre sélectionné
  selectedSort: string = 'date-asc'; // Tri par défaut : Date croissante
  sortBy: string = 'date'; // Par défaut, trier par date
  showFilter: boolean = false;
  selectedDate: string = '';  // Stocker la date sélectionnée
  selectedActivity: any = null;
  dropdownVisible: boolean = false;


  constructor(private popoverController: PopoverController) { }

    // Sample transactions data
    transactions: any[]= [
      {id:1, customer: 'John Doe', transactionId: 'TX123456789', date: new Date('2024-09-10'), amount: 250 },
      { id:2,customer: 'Jane Smith', transactionId: 'TX987654321', date: new Date('2022-09-15'), amount: 100 },
      { id:3,customer: 'Samuel Green', transactionId: 'TX123987654', date: new Date('2023-09-15'), amount: 150 },
      {id:4, customer: 'Jean Eddy', transactionId: 'TX826987654', date: new Date('2021-09-15'), amount: 1050 },
      {id:5, customer: 'Nannot Evelinne', transactionId: 'TX727987654', date: new Date('2022-09-15'), amount: 1450 }
    ];

    filteredActivities: any[] = [...this.transactions];

    
    

    
    // Méthode pour activer/désactiver les filtres (à implémenter)
    toggleFilter() {
      this.filterActivities();  // Ajoutez la logique de filtre ici si nécessaire
    }

      // Method to handle 'more' button click for the card
  presentPopover(event: Event) {
    // Implement the popover options (e.g. delete, edit, etc.)
    console.log('Card options clicked');
  }

  // async presentPopover(event: Event, activity: any) {
  //   const popover = await this.popoverController.create({
  //     component: DropdownMenuComponent, // Le composant pour le menu
  //     event: event,
  //     translucent: false,
  //     componentProps: { activity: activity }, // Passer l'activity au menu déroulant
  //     cssClass: 'custom-popover-position', // Classe personnalisée pour le style
  //   });
  //   console.log('MORE clicked')
  //   return await popover.present();
  // }

  // Method to handle 'more' button click for each transaction item
  openTransactionOptions(transaction: any) {
    // Implement additional options for each transaction (e.g., view details, edit, delete)
    console.log('More options for transaction:', transaction.transactionId);
  }

  filterActivities() {
    const today = new Date();

    // Filtrer par recherche d'activité
    let filtered = this.transactions.filter(activity => {
      return (
        activity.customer.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
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
          comparison = a.customer.localeCompare(b.customer); // Nom croissant (A-Z)
          break;
        case 'name-desc':
          comparison = b.customer.localeCompare(a.customer); // Nom décroissant (Z-A)
          break;
        default:
          break;
      }

      return comparison;
    });

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

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (event.target instanceof HTMLElement && !event.target.closest('app-dropdown-menu')) {
      this.dropdownVisible = false;
    }
  }

}
