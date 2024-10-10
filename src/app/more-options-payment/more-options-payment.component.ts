import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-more-options-payment',
  templateUrl: './more-options-payment.component.html',
  styleUrls: ['./more-options-payment.component.scss'],
})
export class MoreOptionsPaymentComponent  implements OnInit {

  item: any;

  ngOnInit() {}
  
  constructor(private popoverController: PopoverController, private navParams: NavParams) {
    this.item = this.navParams.get('item');
  }
  onOptionClick(option: string) {
    console.log(option); // Gestion des actions en fonction de l'option choisie
    this.popoverController.dismiss();  // Fermer le menu
  }

}
