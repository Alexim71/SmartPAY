import { Component, NgZone  } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menu: MenuController, private router: Router, private zone: NgZone) {this.initializeApp();}

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
            const slug = event.url.split(".app").pop();
            console.log('Deep link URL:', slug);
            if (slug) {
                this.router.navigateByUrl(slug);
            }
        });
    });
}
}
