import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private menu: MenuController) {}

  openPage(page: string) {
    console.log('Opening page:', page);
    // logiques pour naviguer vers la page souhaitée
  }

  closeMenu() {
    this.menu.close();
  }

}
