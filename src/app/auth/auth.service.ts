import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // private isAuthSubject = new BehaviorSubject<boolean>(false);
  // private currentUserSubject = new BehaviorSubject<any>(null);

    private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  // constructor(private http: HttpClient) {}
    constructor(  private http: HttpClient) {
    this.checkLoggedInStatus();
  }

  // get isAuth() {
  //   return this.isAuthSubject.asObservable();
  // }

  // get currentUser() {
  //   return this.currentUserSubject.asObservable();
  // }
  
  //Connexion

  login(credentials: { username: string, password: string }) {
    return this.http.post('https://deadf990-e3da-4826-a47b-22a4b882212d.mock.pstmn.io/login', credentials).pipe(
      tap((response: any) => {
        // Stocker le token dans le stockage local
        // localStorage.setItem('currentToken', JSON.stringify(response));
          if(response){
            console.log('reponse', response)
            console.log( 'user:',response.user)
            
          }

        // this.currentUserSubject.next(response.user);
        // this.isAuthSubject.next(true);
      })
    );
  }


  // logout() {
  //  // localStorage.removeItem('currentToken');
  //   this.currentUserSubject.next(null);
  //   this.isAuthSubject.next(false);
  // }

     // Vérifier si l'utilisateur est connecté
   private async checkLoggedInStatus(): Promise<void> {
    // const currentToken = await this.storage.get('currentToken');

     const currentToken = localStorage.getItem('currentToken');

    this.isLoggedInSubject.next(!!currentToken); // Met à jour le statut de connexion basé sur l'existence du token
  }

}
