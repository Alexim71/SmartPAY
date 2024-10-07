
import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Router, ActivatedRoute  } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { ApiService } from '../services/api.service';

 import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit  {
  email: string = '';
  password: string = '';

  passwordFieldType: string = 'password'; // Default to 'password'
  loginForm: FormGroup;
  returnUrl: string ='';

  // constructor(private authService: AuthService, private toastCtrl: ToastController, private router: Router) {}

  constructor(
    private apiService: ApiService,  // Injection du service ApiService
    private formBuilder: FormBuilder,  // Pour gérer le formulaire de connexion
    private router: Router,            // Pour la navigation
    private toastController: ToastController , // Pour afficher des messages à l'utilisateur
    // private authService: AuthService,
    private toastCtrl: ToastController,
    private route: ActivatedRoute
  ) {
    // Initialisation du formulaire de connexion avec des validations
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Get the returnUrl from the query parameters (default to '/tabs' if not present)
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/tabs';
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

  errorMessage: string = ''; // Variable pour stocker le message d'erreur
 

   // Méthode qui est appelée lorsque l'utilisateur soumet le formulaire de connexion
   async onLogin() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value; // Récupérer les valeurs du formulaire

      try {
        await this.apiService.login(credentials);  // Appel de la méthode login du AuthService

        // Si la connexion est réussie, rediriger l'utilisateur vers la page principale
        // this.router.navigate(['/tabs']);  
        this.router.navigate([this.returnUrl]);
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
