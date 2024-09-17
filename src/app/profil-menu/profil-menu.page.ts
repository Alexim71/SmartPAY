import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-profil-menu',
  templateUrl: './profil-menu.page.html',
  styleUrls: ['./profil-menu.page.scss'],
})
export class ProfilMenuPage implements OnInit {

  constructor(private menu: MenuController) {}
  openMenu() {
    this.menu.open('first'); // 'first' est l'identifiant du menu dans app.component.html
  }

  closeMenu() {
    this.menu.close('first');
  }

  ngOnInit() {
  }

}
