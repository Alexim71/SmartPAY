import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'https://deadf990-e3da-4826-a47b-22a4b882212d.mock.pstmn.io';

  constructor(private http: HttpClient) {
   
  }



  // Méthode pour ajouter les en-têtes avec le token
  private async getHeaders(): Promise<HttpHeaders>  {
    

    const tokenString = localStorage.getItem('currentToken');

     // Si un token est présent, le parser
     const token = tokenString ? JSON.parse(tokenString).access : '';

    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Méthode pour faire une requête GET
  public async get(endpoint: string): Promise<Observable<any>> {
    const headers = await this.getHeaders();
    return this.http.get(`${this.baseURL}${endpoint}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Méthode pour faire une requête POST
  public async post(endpoint: string, data: any): Promise<Observable<any>> {
    const headers = await this.getHeaders();
    return this.http.post(`${this.baseURL}${endpoint}`, data, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Gérer les erreurs
  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.refreshToken();
    }
    return throwError(() => new Error('Une erreur s\'est produite, veuillez réessayer.'));
  }

  // Méthode pour rafraîchir le token en cas d'erreur 401
  private async refreshToken() {
    const currentToken = localStorage.getItem('currentToken');
    const refreshToken = currentToken ? JSON.parse(currentToken).refresh : '';

    const payload = { refresh: refreshToken };

    this.http.post(`${this.baseURL}/user/refreshlogin`, payload).subscribe({
      next: async (response: any) => {
        localStorage.setItem('currentToken', JSON.stringify(response));
      },
      error: () => {
        console.log('Erreur lors du rafraîchissement du token');
        // Gérer la déconnexion si nécessaire
      }
    });
  }
}
