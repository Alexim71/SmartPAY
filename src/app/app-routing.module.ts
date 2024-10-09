import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'create-account', loadChildren: () => import('./create-account/create-account.module').then(m => m.CreateAccountPageModule) },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard] },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule), canActivate: [AuthGuard]
  },
 
  {
    path: 'settings-login',
    loadChildren: () => import('./settings-login/settings-login.module').then( m => m.SettingsLoginPageModule), 
  },
  {
    path: 'payment-details/:transactionId',
    loadChildren: () => import('./payment-details/payment-details.module').then( m => m.PaymentDetailsPageModule), canActivate: [AuthGuard]
  },  {
    path: 'stripe-paiement',
    loadChildren: () => import('./stripe-paiement/stripe-paiement.module').then( m => m.StripePaiementPageModule)
  },



  
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
