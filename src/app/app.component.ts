import { Component, NgZone  } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menu: MenuController, private router: Router, private zone: NgZone) {}

  openPage(page: string) {
    console.log('Navigating to page:', page);
    // Ajouter la logique pour la navigation de page
    this.initializeApp();
  }

  closeMenu() {
    this.menu.close();
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
            // Example url: https://beerswift.app/tabs/tab2
            // slug = /tabs/tab2
            const slug = event.url.split(".app").pop();
            if (slug) {
                this.router.navigateByUrl(slug);
            }
            // If no match, do nothing - let regular routing
            // logic take over
        });
    });
}
}
