import {Component, OnInit} from '@angular/core';
import {ANIMATIONS} from "../../config/animations";

@Component({
  selector: 'app-user-wrapper',
  templateUrl: './user-wrapper.component.html',
  styleUrls: ['./user-wrapper.component.scss'],
  animations: ANIMATIONS.routesAnimation
})
export class UserWrapperComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
