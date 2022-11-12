import { Component, OnInit } from '@angular/core';
import {ROLES} from "../../../config/constant";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  sidebarItems = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'))

      if (user.role === ROLES.ADMIN) {
        this.sidebarItems = [
          {label: 'Dashboard', icon: 'pi pi-chart-line', route: '/admin/dashboard'},
          {label: 'Users', icon: 'pi pi-users', route: '/admin/users'},
          {label: 'Contract', icon: 'pi pi-file', route: '/admin/contracts'}
        ];
      }

      if (user.role === ROLES.USER) {
        this.sidebarItems = [
          {label: 'Dashboard', icon: 'pi pi-chart-line', route: '/user/dashboard'},
        ];
      }
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']).then();
  }

}
