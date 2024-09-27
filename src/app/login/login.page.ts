
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { ApiService } from '../services/api.service';

 import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  passwordFieldType: string = 'password'; // Default to 'password'
  loginForm: FormGroup;

  // constructor(private authService: AuthService, private toastCtrl: ToastController, private router: Router) {}

  constructor(
    private apiService: ApiService,  // Injection du service ApiService
    private formBuilder: FormBuilder,  // Pour gérer le formulaire de connexion
    private router: Router,            // Pour la navigation
    private toastController: ToastController , // Pour afficher des messages à l'utilisateur
    private authService: AuthService,
    private toastCtrl: ToastController,
  ) {
    // Initialisation du formulaire de connexion avec des validations
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

   // Méthode pour afficher un toast (message de notification)
   async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  errorMessage: string = ''; // Variable pour stocker le message d'
 


  


  // onLogin() {
  //   this.authService.login({ username: this.email, password: this.password })
  //     .subscribe({
  //       next: () => {
  //         this.router.navigate(['/tabs']); // Rediriger vers la page d'accueil après la connexion
  //       },
  //       error: (error) => {
  //         this.errorMessage = 'Échec de la connexion. Vérifiez vos identifiants.';
  //       }
  //     });
  // }



  //  // Méthode qui est appelée lorsque l'utilisateur soumet le formulaire de connexion
  //  async onLogin() {
  //   if (this.loginForm.valid) {
  //     const credentials = this.loginForm.value; // Récupérer les valeurs du formulaire

  //     try {
  //       this.authService.login(credentials)
  //       .subscribe({
  //         next: () => {
  //           this.router.navigate(['/tabs']); // Rediriger vers la page d'accueil après la connexion
  //         },
         
  //       });

  //     } catch (error) {
  //       // En cas d'erreur (ex : mauvais identifiants), afficher un message
  //       this.presentToast('Erreur lors de la connexion. Veuillez vérifier vos identifiants.');
  //     }
  //   } else {
  //     // Si le formulaire est invalide, afficher un message d'erreur
  //     this.presentToast('Veuillez remplir correctement le formulaire.');
  //   }
  // }


   // Méthode qui est appelée lorsque l'utilisateur soumet le formulaire de connexion
   async onLogin() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value; // Récupérer les valeurs du formulaire

      try {
        await this.apiService.login(credentials);  // Appel de la méthode login du AuthService

        // Si la connexion est réussie, rediriger l'utilisateur vers la page principale
        this.router.navigate(['/tabs']);  
        this.presentToast('Connexion réussie!');
      } catch (error) {
        // En cas d'erreur (ex : mauvais identifiants), afficher un message
        this.presentToast('Erreur lors de la connexion. Veuillez vérifier vos identifiants.');
      }
    } else {
      // Si le formulaire est invalide, afficher un message d'erreur
      this.presentToast('Veuillez remplir correctement le formulaire.');
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
