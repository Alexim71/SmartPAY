import { Component, Input, OnInit } from '@angular/core';

import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-dropdown-menu-paiement',
  templateUrl: './dropdown-menu-paiement.component.html',
  styleUrls: ['./dropdown-menu-paiement.component.scss'],
})
export class DropdownMenuPaiementComponent  implements OnInit {

  item: any;
  
 

  ngOnInit() {}

  constructor(private popoverController: PopoverController, private navParams: NavParams) {
    this.item = this.navParams.get('item');
  }

  action(action: string) {
    console.log(`${action} clicked for`, this.item);
    this.popoverController.dismiss();
  }

}
