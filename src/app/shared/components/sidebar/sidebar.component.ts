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
  user;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.user = user;

      if (user.role === ROLES.ADMIN) {
        this.sidebarItems = [
          {label: 'Dashboard', icon: 'pi pi-chart-line', route: '/admin/dashboard'},
          {label: 'Users', icon: 'pi pi-users', route: '/admin/users'},
          {label: 'Contract', icon: 'pi pi-file', route: '/admin/contracts'}
        ];
      }

      if (user.role === ROLES.CUSTOMER) {
        this.sidebarItems = [
          {label: 'Dashboard', icon: 'pi pi-chart-line', route: '/user/dashboard'},
          {label: 'Contracts', icon: 'pi pi-file', route: '/user/contracts'},
          {label: 'Profile', icon: 'pi pi-user', route: '/user/edit-profile/' + user._id}
        ];
      }
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']).then();
  }

}
