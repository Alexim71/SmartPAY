import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menu: MenuController) {}

  openPage(page: string) {
    console.log('Navigating to page:', page);
    // Ajouter la logique pour la navigation de page
  }

  closeMenu() {
    this.menu.close();
  }
}
