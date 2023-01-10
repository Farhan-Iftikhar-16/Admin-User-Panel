import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserContractsComponent} from './user-contracts/user-contracts.component';
import {SharedModule} from "../shared/shared.module";
import {UserWrapperComponent} from './user-wrapper/user-wrapper.component';
import {UserRoutingModule} from "./user-routing.module";
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import { ViewContractComponent } from './view-contract/view-contract.component';
import { TransactionsComponent } from '../shared/components/transactions/transactions.component';
import { UserSubscriptionsComponent } from '../shared/components/user-subscriptions/user-subscriptions.component';
import { CardsComponent } from './cards/cards.component';

@NgModule({
  declarations: [
    UserContractsComponent,
    UserWrapperComponent,
    UserDashboardComponent,
    ViewContractComponent,
    TransactionsComponent,
    UserSubscriptionsComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule {
}
