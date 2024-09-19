// // src/app/services/auth.service.ts
// import { Injectable } from '@angular/core';
// import { Platform } from '@ionic/angular';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
// import { User } from '../models/user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   user: User | null = null;

//   constructor(private platform: Platform) {
//     // Initialisation pour Google Auth
//     if (this.platform.is('capacitor')) {
//       GoogleAuth.initialize();
//     }
//   }

//   async signInWithGoogle(): Promise<User | null> {
//     try {
//       const googleUser = await GoogleAuth.signIn();
//       this.user = {
//         id: googleUser.id,
//         email: googleUser.email,
//         displayName: googleUser.displayName,
//         imageUrl: googleUser.imageUrl,
//       };
//       return this.user;
//     } catch (error) {
//       console.error('Erreur de connexion Google :', error);
//       return null;
//     }
//   }

//   async signOut(): Promise<void> {
//     try {
//       await GoogleAuth.signOut();
//       this.user = null;
//     } catch (error) {
//       console.error('Erreur de déconnexion Google :', error);
//     }
//   }

//   isAuthenticated(): boolean {
//     return this.user !== null;
//   }
// }
