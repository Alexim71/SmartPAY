import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Simulation locale des identifiants corrects
  private validCredentials = {
    email: 'test@example.com',
    password: 'password123'
  };

  constructor() {}

  // Simule la connexion
  login( email: string , password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Compare les identifiants entrés avec ceux simulés
        if ( email === this.validCredentials.email && password === this.validCredentials.password) {
          resolve(true); // Connexion réussie
        } else {
          reject('Invalid credentials'); // Identifiants incorrects
        }
      }, 1000); // Simule un délai pour l'appel
    });
  }
}
