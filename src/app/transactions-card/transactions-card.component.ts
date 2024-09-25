import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-card',
  templateUrl: './transactions-card.component.html',
  styleUrls: ['./transactions-card.component.scss'],
})
export class TransactionsCardComponent  implements OnInit {
  
  ngOnInit() {}

    // Sample transactions data
    transactions = [
      { customer: 'John Doe', transactionId: 'TX123456789', date: new Date(), amount: 250 },
      { customer: 'Jane Smith', transactionId: 'TX987654321', date: new Date(), amount: 100 },
      { customer: 'Samuel Green', transactionId: 'TX123987654', date: new Date(), amount: 150 }
    ];
    constructor() { }


      // Method to handle 'more' button click for the card
  presentPopover(event: Event) {
    // Implement the popover options (e.g. delete, edit, etc.)
    console.log('Card options clicked');
  }
  // Method to handle 'more' button click for each transaction item
  openTransactionOptions(transaction: any) {
    // Implement additional options for each transaction (e.g., view details, edit, delete)
    console.log('More options for transaction:', transaction.transactionId);
  }

  

}
