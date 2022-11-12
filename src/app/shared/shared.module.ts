import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormControlComponent} from './components/form-control/form-control.component';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {TooltipModule} from 'primeng/tooltip';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ToastModule} from 'primeng/toast';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {SkeletonModule} from 'primeng/skeleton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {AvatarModule} from 'primeng/avatar';
import {RatingModule} from 'primeng/rating';
import {TreeModule} from 'primeng/tree';
import {RouterModule} from '@angular/router';
import {PasswordModule} from "primeng/password";
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from "primeng/calendar";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {AutoCompleteModule} from "primeng/autocomplete";
import {RadioButtonModule} from "primeng/radiobutton";
import {ProgressBarModule} from "primeng/progressbar";
import {MenuModule} from "primeng/menu";
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {InputSwitchModule} from "primeng/inputswitch";
import {ChipsModule} from "primeng/chips";
import {TabViewModule} from "primeng/tabview";
import {SelectButtonModule} from "primeng/selectbutton";
import {PaginatorModule} from 'primeng/paginator';
import {CarouselModule} from 'primeng/carousel';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {FileUploadModule} from "primeng/fileupload";

const MODULES = [
  FormsModule,
  ReactiveFormsModule,
  TableModule,
  InputTextModule,
  ButtonModule,
  DropdownModule,
  TooltipModule,
  DynamicDialogModule,
  ToastModule,
  ConfirmPopupModule,
  SkeletonModule,
  InputTextareaModule,
  AvatarModule,
  RatingModule,
  TreeModule,
  PasswordModule,
  DialogModule,
  CalendarModule,
  ConfirmDialogModule,
  ProgressSpinnerModule,
  AutoCompleteModule,
  RadioButtonModule,
  ProgressBarModule,
  MenuModule,
  InputSwitchModule,
  ChipsModule,
  TabViewModule,
  SelectButtonModule,
  RatingModule,
  PaginatorModule,
  CarouselModule,
  FileUploadModule
];

const COMPONENTS = [
  FormControlComponent,
  SidebarComponent
];


@NgModule({
  declarations: [...COMPONENTS, EditUserComponent],
  imports: [CommonModule, ...MODULES, RouterModule],
  exports: [...MODULES, ...COMPONENTS],
  providers: []
})
export class SharedModule {
}
