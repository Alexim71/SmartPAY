import { Component, OnInit } from '@angular/core';

import { NavController, ActionSheetController , MenuController   } from '@ionic/angular';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent  implements OnInit {
  
  
  searchQuery: string = ''; // Chaîne de recherche pour la recherche d'activités
  selectedFilter: string = ''; // Filtre sélectionné
  selectedSort: string = 'date-asc'; // Tri par défaut : Date croissante
  sortBy: string = 'date'; // Par défaut, trier par date
  showFilter: boolean = false;
  selectedDate: string = '';  // Stocker la date sélectionnée

  constructor(private navCtrl: NavController, private actionSheetController: ActionSheetController, private menu: MenuController) {}

  activities: any[] = [
    { id: 1, name: 'Activity 1', date: new Date('2024-09-10'), type: 'Meeting' },
    { id: 2, name: 'Activity 2', date: new Date('2024-09-15'), type: 'Task' },
    { id: 3, name: 'Activity 3', date: new Date('2024-09-20'), type: 'Event' },
    // Ajoutez d'autres activités ici
  ];

  filteredActivities: any[] = [...this.activities]; // Activités filtrées à afficher
 
   // Méthode pour activer/désactiver les filtres (à implémenter)
   toggleFilter() {
    this.filterActivities();  // Ajoutez la logique de filtre ici si nécessaire
  }
  filterActivities() {
    const today = new Date();

    // Filtrer par recherche d'activité
    let filtered = this.activities.filter(activity => {
      return (
        activity.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        activity.type.toLowerCase().includes(this.searchQuery.toLowerCase())
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

  ngOnInit() {}

}
