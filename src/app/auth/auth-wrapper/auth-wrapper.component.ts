import { Component, OnInit } from '@angular/core';
import {ANIMATIONS} from "../../config/animations";

@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.scss'],
  animations: ANIMATIONS.routesAnimation
})
export class AuthWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
