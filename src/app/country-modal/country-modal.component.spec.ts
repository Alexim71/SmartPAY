import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-country-modal',
  templateUrl: './country-modal.component.html',
})
export class CountryModalComponent {
  countries = ['United States', 'Canada', 'France', 'Germany', 'United Kingdom', 'Brazil', 'Japan', 'India', 'Russia'];

  constructor(private modalCtrl: ModalController) {}

  // Dismiss the modal
  dismiss() {
    this.modalCtrl.dismiss();
  }

  // Select a country and pass it back to the parent component
  selectCountry(country: string) {
    this.modalCtrl.dismiss(country);
  }
}
