import { Component } from '@angular/core';
import { AuthService } from '../auth.service/auth.service'; // Assure-toi que le chemin est correct
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Variable pour stocker le message d'erreur
  passwordFieldType: string = 'password'; // Default to 'password'

  constructor(private authService: AuthService, private toastCtrl: ToastController, private router: Router) {}

  async onLogin() {
    this.errorMessage = ''; // Réinitialise le message d'erreur à chaque tentative
    try {
      const success = await this.authService.login( this.password);
      if (success) {
        // Redirige vers la page principale ou affiche un message de succès
        this.router.navigate(['/tabs']);
        console.log('Login successful');
      }
    } catch (error) {
      this.errorMessage = 'Incorrect email or password'; // Message d'erreur en cas d'échec
      this.presentErrorToast();
    }
  }

  async presentErrorToast() {
    const toast = await this.toastCtrl.create({
      message: this.errorMessage,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  goToCreateAccount() {
    this.router.navigate(['/create-account']);
  }
}
