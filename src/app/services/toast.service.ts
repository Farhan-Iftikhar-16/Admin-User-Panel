import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import {type} from "os";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private ms: MessageService
  ) {}

  error(txt, title = 'Error', time = 2500): void {
    this.ms.add({severity: 'error', summary: title, detail: txt.error && typeof(txt.error) === 'object' && txt.error.message ? txt.error.message : txt, life: time});
  }

  success(txt, title = 'Success', time = 2500): void {
    this.ms.add({severity: 'success', summary: title, detail: txt, life: time});
  }

  info(txt, title = 'Notification', time = 2500): void {
    this.ms.add({severity: 'info', summary: title, detail: txt, life: time});
  }
}
