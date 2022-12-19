import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminWrapperComponent} from "./admin-wrapper/admin-wrapper.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UsersComponent} from "./users/users.component";
import {EditUserComponent} from "../shared/components/edit-user/edit-user.component";
import {ContractsComponent} from "./contracts/contracts.component";
import {EditContractComponent} from "./edit-contract/edit-contract.component";
import {StripePaymentFormComponent} from "../shared/components/stripe-payment-form/stripe-payment-form.component";

const routes: Routes = [
  {
    path: '',
    component: AdminWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'edit-user/:id',
        component: EditUserComponent
      },
      {
        path: 'contracts',
        component: ContractsComponent
      },
      {
        path:'edit-contract/:id',
        component: EditContractComponent
      },
      {
        path:'stripe-payment',
        component: StripePaymentFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {

}
