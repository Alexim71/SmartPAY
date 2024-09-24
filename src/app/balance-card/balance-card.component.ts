import { Component, OnInit, HostListener } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MoreOptionsComponent } from '../more-options/more-options.component';


@Component({
  selector: 'app-balance-card',
  templateUrl: './balance-card.component.html',
  styleUrls: ['./balance-card.component.scss'],
})
export class BalanceCardComponent  implements OnInit {
  moreOptionVisible: boolean = false;

  balanceAmount: number = 1500.75;  // Montant de la balance utilisateur

  constructor(private popoverController: PopoverController) {}

  // Méthode pour ouvrir le menu 'More' avec Popover
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MoreOptionsComponent, // Le menu 'More' en tant que composant
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  showMoreOptionMenu(event: MouseEvent, activity: any) {
    this.moreOptionVisible = true;
    const target = event.currentTarget as HTMLElement;
   
  }


  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (event.target instanceof HTMLElement && !event.target.closest('app-dropdown-menu')) {
      this.moreOptionVisible = false;
    }
  }

  ngOnInit() {}

}
