import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-card',
  templateUrl: './calendar-card.component.html',
  styleUrls: ['./calendar-card.component.scss'],
})
export class CalendarCardComponent {

  selectedDate: string ='';  // Stocke la date sélectionnée

  constructor() { }

  // Fonction pour afficher les événements selon la date sélectionnée
  viewEvents() {
    if (this.selectedDate) {
      console.log(`Viewing events for: ${this.selectedDate}`);
      // Logique pour afficher les événements à cette date
    } else {
      console.log('Please select a date.');
    }
  }

}
