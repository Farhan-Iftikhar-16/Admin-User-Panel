import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminWrapperComponent} from "./admin-wrapper/admin-wrapper.component";
import {AdminService} from "./admin.service";
import {SharedModule} from "../shared/shared.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import {AdminRoutingModule} from "./admin-routing.module";
import { UsersComponent } from './users/users.component';
import { ContractsComponent } from './contracts/contracts.component';
import { EditContractComponent } from './edit-contract/edit-contract.component';

@NgModule({
  declarations: [
    AdminWrapperComponent,
    DashboardComponent,
    UsersComponent,
    ContractsComponent,
    EditContractComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule {
}
