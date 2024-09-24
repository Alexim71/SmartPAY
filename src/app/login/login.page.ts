import { Component } from '@angular/core';
import { AuthService } from '../auth.service/auth.service'; // Assure-toi que le chemin est correct
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { AuthService } from '../auth/auth.service';
 import { ToastController } from '@ionic/angular';
=======
>>>>>>> dfd17ebbd50117ba9a647c54b6f7aa2426b56217

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Variable pour stocker le message d'erreur
<<<<<<< HEAD
  
  constructor(private router: Router, private authService: AuthService, private toastCtrl: ToastController) {}

  // onLogin() {
  //   // Ajouter ici la logique de validation de l'utilisateur
  //   // Après une authentification réussie, rediriger vers l'écran avec les onglets
  //   this.router.navigate(['/tabs']);
  // }
=======
  passwordFieldType: string = 'password'; // Default to 'password'

  constructor(private authService: AuthService, private toastCtrl: ToastController, private router: Router) {}
>>>>>>> dfd17ebbd50117ba9a647c54b6f7aa2426b56217

  async onLogin() {
    this.errorMessage = ''; // Réinitialise le message d'erreur à chaque tentative
    try {
<<<<<<< HEAD
      const success = await this.authService.login( this.email, this.password);
      
      console.log('Login result:', success);
      if (success) {
        this.errorMessage = '';
        // Redirige vers la page principale ou affiche un message de succès
         this.router.navigate(['/tabs']);
        console.log('Login successful');
        console.log('connexion reussi!!!!')
=======
      const success = await this.authService.login( this.password);
      if (success) {
        // Redirige vers la page principale ou affiche un message de succès
        this.router.navigate(['/tabs']);
        console.log('Login successful');
>>>>>>> dfd17ebbd50117ba9a647c54b6f7aa2426b56217
      }
    } catch (error) {
      this.errorMessage = 'Incorrect email or password'; // Message d'erreur en cas d'échec
      this.presentErrorToast();
<<<<<<< HEAD
       console.log('Login failed');
       console.log(this.email, this.password)
      
=======
>>>>>>> dfd17ebbd50117ba9a647c54b6f7aa2426b56217
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
