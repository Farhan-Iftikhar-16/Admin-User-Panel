import { Component, OnInit } from '@angular/core';
import {STATUS, STATUS_VALUE_SET} from "../../config/constant";
import {Subject, takeUntil} from "rxjs";
import {ToastService} from "../../services/toast.service";
import {AdminService} from "../admin.service";
import * as moment from "moment";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  user;
  users = [];
  filteredUsers = [];
  status = STATUS;
  statusValueSet = STATUS_VALUE_SET;
  componentInView = new Subject();

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.users = response.users;
      this.filteredUsers = [...this.users];
      this.filteredUsers.forEach(user => user.status = user.status === 'ACTIVE');
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  filterUsersList(event): void {
    const value = event.value;

    if (value === 'ALL') {
      this.filteredUsers = [...this.users];
      return;
    }

    if (value === 'ACTIVE') {
      this.filteredUsers = this.users.filter(user => user.status === 'ACTIVE');
      return;
    }

    this.filteredUsers = this.users.filter(user => user.status === 'INACTIVE');
  }

  getAge(user): string {
    const age = moment(new Date()).diff(moment(user.dateOfBirth).format('MM/DD/YYYY'), 'years');

    if (age > 0 ) {
      return `${age} Years`;
    }

    if (age === 0) {
      const days = moment(new Date()).diff(moment(user.dateOfBirth).format('MM/DD/YYYY'), 'days')

      if (days < 30) {
        return `${days} Days`;
      }

      return `${moment(new Date()).diff(moment(user.dateOfBirth).format('MM/DD/YYYY'), 'months')} Months`;
    }
  }

  updateUserStatus(user): void {
    const params = {
      status: !user.status ? this.status.INACTIVE : this.status.ACTIVE
    };

    this.userService.updateUserStatus(user._id, params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
      this.getUsers();
    }, error => {
      this.toastService.error(error.error.message);
    });
  }
}
