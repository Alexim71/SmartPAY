import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CalendarCardComponent } from '../calendar-card/calendar-card.component'; 

import {TimelineComponent} from '../timeline/timeline.component'
import {DropdownMenuComponent} from '../dropdown-menu/dropdown-menu.component'
import {LateralMenuComponent} from '../lateral-menu/lateral-menu.component'
import {BalanceCardComponent} from '../balance-card/balance-card.component'
import {MoreOptionsComponent} from '../more-options/more-options.component'
import {TransactionsCardComponent} from '../transactions-card/transactions-card.component'
import {OverviewCardComponent} from '../overview-card/overview-card.component'
// import { ChartsModule } from 'ng2-charts';

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    OverviewCardComponent
  ],
  declarations: [Tab1Page, CalendarCardComponent,TimelineComponent,DropdownMenuComponent, LateralMenuComponent,
     BalanceCardComponent, MoreOptionsComponent, TransactionsCardComponent]
})
export class Tab1PageModule {}
