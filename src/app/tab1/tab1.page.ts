import { Component } from '@angular/core';
import { NavController, ActionSheetController , MenuController   } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  searchQuery: string = ''; // Chaîne de recherche pour la recherche d'activités
  selectedFilter: string = ''; // Filtre sélectionné
  activities: any[] = [
    { id: 1, name: 'Activity 1', date: new Date('2024-09-10'), type: 'Meeting' },
    { id: 2, name: 'Activity 2', date: new Date('2024-09-15'), type: 'Task' },
    { id: 3, name: 'Activity 3', date: new Date('2024-09-20'), type: 'Event' },
    // Ajoutez d'autres activités ici
  ];
  filteredActivities: any[] = [...this.activities]; // Activités filtrées à afficher

  constructor() {}

  // Méthode pour filtrer les activités en fonction de la recherche et du filtre
  filterActivities() {
    // Filtrer par chaîne de recherche
    this.filteredActivities = this.activities.filter(activity => {
      const matchesNameOrType = activity.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                                activity.type.toLowerCase().includes(this.searchQuery.toLowerCase());

      // Ajouter la logique de filtrage basée sur `selectedFilter` si nécessaire
      return matchesNameOrType && this.applyDateFilter(activity);
    });
  }

  // Méthode pour filtrer par date selon le filtre sélectionné
  applyDateFilter(activity: any): boolean {
    if (!this.selectedFilter) {
      return true; // Pas de filtre appliqué
    }

    const today = new Date();
    const activityDate = new Date(activity.date);

    switch (this.selectedFilter) {
      case 'overdue':
        return activityDate < today;
      case 'due-date':
        return activityDate.toDateString() === today.toDateString();
      case 'next-7-days':
        return this.isWithinNextDays(activityDate, 7);
      case 'next-30-days':
        return this.isWithinNextDays(activityDate, 30);
      case 'next-3-months':
        return this.isWithinNextDays(activityDate, 90);
      case 'next-6-months':
        return this.isWithinNextDays(activityDate, 180);
      default:
        return true;
    }
  }

  // Vérifier si une activité est dans les X prochains jours
  isWithinNextDays(activityDate: Date, days: number): boolean {
    const today = new Date();
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + days);
    return activityDate >= today && activityDate <= targetDate;
  }

  // Méthode pour activer le tri des activités (à implémenter)
  toggleSort() {
    // Ajoutez la logique de tri ici si nécessaire
  }

  // Méthode pour activer/désactiver les filtres (à implémenter)
  toggleFilter() {
    // Ajoutez la logique de filtre ici si nécessaire
  }

}
