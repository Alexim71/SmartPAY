import { Component, OnInit } from '@angular/core';

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

    // Sample transactions data
    transactions: any[]= [
      { customer: 'John Doe', transactionId: 'TX123456789', date: new Date(), amount: 250 },
      { customer: 'Jane Smith', transactionId: 'TX987654321', date: new Date(), amount: 100 },
      { customer: 'Samuel Green', transactionId: 'TX123987654', date: new Date(), amount: 150 },
      { customer: 'Jean Eddy', transactionId: 'TX826987654', date: new Date(), amount: 1050 },
      { customer: 'Nannot Evelinne', transactionId: 'TX727987654', date: new Date(), amount: 1450 }
    ];

    filteredActivities: any[] = [...this.transactions];

    
    constructor() { }

    
    // Méthode pour activer/désactiver les filtres (à implémenter)
    toggleFilter() {
      this.filterActivities();  // Ajoutez la logique de filtre ici si nécessaire
    }

      // Method to handle 'more' button click for the card
  presentPopover(event: Event) {
    // Implement the popover options (e.g. delete, edit, etc.)
    console.log('Card options clicked');
  }
  // Method to handle 'more' button click for each transaction item
  openTransactionOptions(transaction: any) {
    // Implement additional options for each transaction (e.g., view details, edit, delete)
    console.log('More options for transaction:', transaction.transactionId);
  }

  filterActivities() {
    const today = new Date();

    // Filtrer par recherche d'activité
    let filtered = this.transactions.filter(transactions => {
      return (
        transactions.customer.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        transactions.transactionId.toLowerCase().includes(this.searchQuery.toLowerCase())
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
          comparison = a.name.localeCompare(b.name); // Nom croissant (A-Z)
          break;
        case 'name-desc':
          comparison = b.name.localeCompare(a.name); // Nom décroissant (Z-A)
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

}
