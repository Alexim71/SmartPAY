import { Component } from '@angular/core';
import { NavController, ActionSheetController , MenuController   } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private navCtrl: NavController, private actionSheetController: ActionSheetController, private menu: MenuController) {}
  openSettings() {
    // Logique pour ouvrir la page des paramètres
    // this.navCtrl.navigateForward('/settings');
  }

  onProfileClick() {
    // Logic to handle profile icon click
    console.log('Profile icon clicked');
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'More Options',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Profile',
          icon: 'person',
          handler: () => {
            console.log('Profile clicked');
            // Navigate to profile page or perform action
          }
        },
        {
          text: 'Settings',
          icon: 'settings',
          handler: () => {
            console.log('Settings clicked');
            // Navigate to settings page or perform action
          }
        },
        {
          text: 'Notifications',
          icon: 'notifications',
          handler: () => {
            console.log('Notifications clicked');
            // Navigate to notifications page or perform action
          }
        },
        {
          text: 'Help',
          icon: 'help-circle',
          handler: () => {
            console.log('Help clicked');
            // Navigate to help page or perform action
          }
        },
        {
          text: 'Log Out',
          icon: 'log-out',
          // color: 'danger',
          handler: () => {
            console.log('Log Out clicked');
            // Handle logout
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Action cancelled');
          }
        }
      ]
    });
    await actionSheet.present();
  }
  

  openMenu() {
    this.menu.open(); // Ouvre le menu
  }

}
