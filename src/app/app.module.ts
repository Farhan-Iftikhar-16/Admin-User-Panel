import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {NgHttpLoaderModule} from "ng-http-loader";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      AppRoutingModule,
      ToastModule,
      NgHttpLoaderModule.forRoot()
    ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
