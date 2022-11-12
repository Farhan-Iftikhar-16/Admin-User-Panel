import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "../shared/shared.module";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthWrapperComponent} from "./auth-wrapper/auth-wrapper.component";
import {AuthService} from "./auth.service";

@NgModule({
  declarations: [
    AuthWrapperComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
}
