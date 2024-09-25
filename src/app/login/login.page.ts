import { Component, OnInit  } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
 import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Variable pour stocker le message d'
  passwordFieldType: string='password'

  
  constructor(private router: Router, private authService: AuthService, private toastCtrl: ToastController) {}

   // Vérifier l'état de connexion à l'initialisation
   ngOnInit() {
    if (this.authService.isLoggedIn()) {
      // Si l'utilisateur est déjà connecté, redirige-le vers la page principale
      this.router.navigate(['/tabs']);
    }
  }


  async onLogin() {
    this.errorMessage = ''; // Réinitialise le message d'erreur à chaque tentative
    try {

      const success = await this.authService.login( this.email, this.password);
      
      console.log('Login result:', success);
      if (success) {
        this.errorMessage = '';
        // Redirige vers la page principale ou affiche un message de succès
         this.router.navigate(['/tabs']);
        console.log('Login successful');
        console.log('connexion reussi!!!!')

      }
    } catch (error) {
      this.errorMessage = 'Incorrect email or password'; // Message d'erreur en cas d'échec
      this.presentErrorToast();

       console.log('Login failed');
       console.log(this.email, this.password)
      

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
