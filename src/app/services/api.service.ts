import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private authservice: AuthService) {
    this.checkLoggedInStatus();
  }

  // Méthode pour se connecter
  public async login(credentials: { email: string; password: string }): Promise<void> {
    try {
      const response = await firstValueFrom( await  this.authservice.post('/login', credentials));
   
      localStorage.setItem('currentToken', JSON.stringify(response));
      this.isLoggedInSubject.next(true); // Met à jour le statut de connexion
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  }

  // Méthode pour se déconnecter
  public async logout(): Promise<void> {
    
    localStorage.removeItem('currentToken');
    this.isLoggedInSubject.next(false); // Met à jour le statut de connexion
  }

   // Vérifier si l'utilisateur est connecté
   private async checkLoggedInStatus(): Promise<void> {
   
    const currentToken = localStorage.getItem('currentToken');
    this.isLoggedInSubject.next(!!currentToken); // Met à jour le statut de connexion basé sur l'existence du token
  }

   // Méthode pour vérifier l'authentification
   public isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

}
