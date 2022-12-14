import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserWrapperComponent} from "./user-wrapper/user-wrapper.component";
import {UserContractsComponent} from "./user-contracts/user-contracts.component";
import {EditUserComponent} from "../shared/components/edit-user/edit-user.component";
import {UserDashboardComponent} from "./user-dashboard/user-dashboard.component";
import {ViewContractComponent} from "./view-contract/view-contract.component";
import {TransactionsComponent} from "../shared/components/transactions/transactions.component";
import {UserSubscriptionsComponent} from "../shared/components/user-subscriptions/user-subscriptions.component";
import {CardsComponent} from "./cards/cards.component";

const routes: Routes = [
  {
    path: '',
    component: UserWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: UserDashboardComponent
      },
      {
        path: 'contracts',
        component: UserContractsComponent
      },
      {
        path: 'view-contract/:id',
        component: ViewContractComponent
      },
      {
        path: 'edit-profile/:id',
        component: EditUserComponent
      },
      {
        path: 'transactions',
        component: TransactionsComponent
      },
      {
        path: 'subscriptions',
        component: UserSubscriptionsComponent
      },
      {
        path: 'cards',
        component: CardsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {

}
