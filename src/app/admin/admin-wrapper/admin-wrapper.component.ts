import {Component, OnInit} from '@angular/core';
import {ANIMATIONS} from "../../config/animations";
import {Subject} from "rxjs";
import {ROLES} from "../../config/constant";

@Component({
  selector: 'app-admin-wrapper',
  templateUrl: './admin-wrapper.component.html',
  styleUrls: ['./admin-wrapper.component.scss'],
  animations: ANIMATIONS.routesAnimation
})
export class AdminWrapperComponent implements OnInit {

  user;

  constructor() {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }
}
