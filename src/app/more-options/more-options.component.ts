import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-more-options',
  templateUrl: './more-options.component.html',
  styleUrls: ['./more-options.component.scss'],
})
export class MoreOptionsComponent  implements OnInit {
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
