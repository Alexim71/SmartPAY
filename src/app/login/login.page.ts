import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  password: string = '';
  passwordFieldType: string = 'password'; // Default to 'password'
  constructor(private router: Router) {}

  onLogin() {
    // Ajouter ici la logique de validation de l'utilisateur
    // Après une authentification réussie, rediriger vers l'écran avec les onglets
    this.router.navigate(['/tabs']);
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  goToCreateAccount() {
    this.router.navigate(['/create-account']);
  }
}
