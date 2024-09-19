import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FilterModalComponent } from '../filter-modal/filter-modal.component'; // Créez une modale pour les filtres
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  searchQuery: string = ''; // Chaîne de recherche pour la recherche d'activités
  selectedFilter: string = ''; // Filtre sélectionné

  sortBy: string = 'date'; // Par défaut, trier par date
  sortAscending: boolean = true; // Par défaut, trier en ordre croissant

  selectedSort: string = 'date-asc'; // Tri par défaut : Date croissante

  activities: any[] = [
    { id: 1, name: 'Activity 1', date: new Date('2024-09-10'), type: 'Meeting' },
    { id: 2, name: 'Activity 2', date: new Date('2024-09-15'), type: 'Task' },
    { id: 3, name: 'Activity 3', date: new Date('2024-09-20'), type: 'Event' },
    // Ajoutez d'autres activités ici
  ];
  filteredActivities: any[] = [...this.activities]; // Activités filtrées à afficher

  constructor() {}

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
    // Alterner entre tri par date et tri par nom
    if (this.sortBy === 'date') {
      this.sortBy = 'name';
    } else {
      this.sortBy = 'date';
    }
    this.sortActivities(); // Appliquer le tri
  }

  // sortActivities() {
  //   this.filteredActivities.sort((a, b) => {
  //     let comparison = 0;

  //     if (this.sortBy === 'date') {
  //       comparison = a.date.getTime() - b.date.getTime(); // Comparer les dates
  //     } else if (this.sortBy === 'name') {
  //       comparison = a.name.localeCompare(b.name); // Comparer les noms
  //     }

  //     // Appliquer l'ordre croissant ou décroissant
  //     return this.sortAscending ? comparison : -comparison;
  //   });

  //   // Alterner entre ordre croissant et décroissant à chaque tri
  //   this.sortAscending = !this.sortAscending;
  // }

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

}
