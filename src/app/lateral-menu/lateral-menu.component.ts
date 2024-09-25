import { Component, OnInit } from '@angular/core';
import {  MenuController   } from '@ionic/angular';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.scss'],
})
export class LateralMenuComponent  implements OnInit {

  constructor( private menu: MenuController) {}

  logout(){}

  closeMenu(){
    this.menu.close('profileMenu');
  }

  ngOnInit() {}

}
