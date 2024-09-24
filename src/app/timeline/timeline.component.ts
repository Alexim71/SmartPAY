import { Component, OnInit, HostListener } from '@angular/core';

import { NavController, ActionSheetController , MenuController   } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component'; // Menu déroulant


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

  dropdownVisible: boolean = false;
  dropdownTop: number = 0;
  dropdownLeft: number = 0;
  selectedActivity: any = null;
  clickedItem: any = null;


  constructor(private popoverController: PopoverController, private navCtrl: NavController, private actionSheetController: ActionSheetController, private menu: MenuController) {}

  activities: any[] = [
    { id: 1, name: 'Payment with PayPAL', date: new Date('2024-09-10'), type: 'payment', color: '#3880ff' },
    { id: 2, name: 'Payment with MonCASH', date: new Date('2022-09-15'), type: 'payment', color: '#ff5722' },
    { id: 3, name: 'Payment with NatCASH', date: new Date('2023-09-20'), type: 'payment', color: '#9c27b0' },
    { id: 4, name: 'Payment with VISA', date: new Date('2021-09-20'), type: 'payment', color: '#4caf50' },
    { id: 5, name: 'Payment with MasterCARD', date: new Date('2020-09-20'), type: 'payment', color: '#ffeb3b' },
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

  // onActivityClick(activity : any){
  //   console.log('Activity clicked:', activity)
  // }

  showDropdownMenu(event: MouseEvent, activity: any) {
    this.dropdownVisible = true;
    const target = event.currentTarget as HTMLElement;
    this.dropdownTop = target.offsetTop + target.offsetHeight;
    this.dropdownLeft = target.offsetLeft;
    this.selectedActivity = activity;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (event.target instanceof HTMLElement && !event.target.closest('app-dropdown-menu')) {
      this.dropdownVisible = false;
    }
  }

  onActivityClick(activity : any) {
    console.log('Activity clicked:', activity);
    console.log('PAYMENT clicked')
    // Additional logic for activity click
  }

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

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  onItemClick(activity: any) {
    this.clickedItem = activity;
    // Optionnel : Réinitialiser après un certain délai pour que l'animation disparaisse
    setTimeout(() => {
      this.clickedItem = null;
    }, 300); // la même durée que la transition
  }
  
  ngOnInit() {}

}
