import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent  implements OnInit {

  selectedFilter: string = '';

  constructor(private modalController: ModalController) {}

  // Appliquer le filtre et fermer la modale
  applyFilter() {
    this.modalController.dismiss({
      selectedFilter: this.selectedFilter
    });
  }

  // Fermer la modale sans appliquer de filtre
  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {}

}
