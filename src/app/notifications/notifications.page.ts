import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

interface Notification {
  id: number;
  title: string;
  message: string;
  date: Date;
  isRead: boolean;
  transactionId?: number; // Champ optionnel pour les transactions liées
}



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  

  ngOnInit() {
  }


  notifications: Notification[] = [
    {
      id: 1,
      title: 'Transaction réussie',
      message: 'Votre transaction a été effectuée avec succès.',
      date: new Date(),
      isRead: false,
      transactionId: 12345
    },
    {
      id: 2,
      title: 'Paiement en attente',
      message: 'Un paiement est en attente pour votre facture.',
      date: new Date(),
      isRead: false,
      transactionId: 12345 // Lier la notification à une transaction spécifique
    },
    // Plus de notifications ici...
  ];

  clickedItem: any = null;  // Ajoute cette propriété pour suivre l'élément cliqué


  filteredNotifications: Notification[] = [];
  searchQuery: string = '';

  constructor(private router: Router) {
    // Initialisation des notifications filtrées avec toutes les notifications au chargement
    this.filteredNotifications = this.notifications;
  }

  // Fonction pour filtrer les notifications selon la recherche
  filterNotifications() {
    const query = this.searchQuery.toLowerCase();
    this.filteredNotifications = this.notifications.filter(notification =>
      notification.title.toLowerCase().includes(query) ||
      notification.message.toLowerCase().includes(query)
    );
  }

  // Fonction pour marquer une notification comme lue
  markAsRead(notification : any) {
    notification.isRead = true;
  }

  // Fonction pour supprimer une notification
  deleteNotification(notification : any) {
    this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
    this.filterNotifications(); // Mise à jour des notifications filtrées
  }

  // Naviguer vers la page de paiement
  goToPaymentDetails(transactionId: number) {
    this.router.navigate(['/payment-details', transactionId]);
  }

}
