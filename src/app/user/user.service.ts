import { Injectable } from '@angular/core';
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apiService: ApiService
  ) { }

  addUser(params): Observable<any> {
    return this.apiService.post(`users/create-user`, params);
  }

  updateUser(params): Observable<any> {
    return this.apiService.put(`users/update-user/${params.id}`, params);
  }

  getUserDetails(id): Observable<any> {
    return this.apiService.get(`users/get-user-by-id/${id}`);
  }

  getUsers(query = null): Observable<any> {
    if (query) {
      const params = new HttpParams().set('text', query);

      return this.apiService.get(`users/get-users`, params);
    }

    return this.apiService.get(`users/get-users`);
  }

  updateUserStatus(id, params): Observable<any> {
    return this.apiService.put(`users/update-user-status/${id}`, params);
  }

  createCustomerAndPayAmount(params): Observable<any> {
    return this.apiService.post(`stripe/create-customer-and-pay-amount`, params);
  }

  payAmount(params): Observable<any> {
    return this.apiService.post(`stripe/pay-amount`, params);
  }

  getCustomerById(id): Observable<any> {
    return this.apiService.get(`stripe/get-customer-by-id/${id}`);
  }

  getUserTransactions(customerId?: string): Observable<any> {
    if (customerId) {
      let queryParams = new HttpParams();
      queryParams = queryParams.set('customer', customerId);
      return this.apiService.get(`stripe/transactions`, queryParams);
    }

    return this.apiService.get(`stripe/transactions`);
  }

  getSubscriptions(customerId?: string): Observable<any> {
    if (customerId) {
      let queryParams = new HttpParams();
      queryParams = queryParams.set('customer', customerId);
      return this.apiService.get(`stripe/subscriptions`, queryParams);
    }

    return this.apiService.get(`stripe/subscriptions`);
  }

  getCanceledSubscriptions(customerId?: string): Observable<any> {
    if (customerId) {
      let queryParams = new HttpParams();
      queryParams = queryParams.set('customer', customerId);
      return this.apiService.get(`stripe/canceled-subscriptions`, queryParams);
    }

    return this.apiService.get(`stripe/canceled-subscriptions`);
  }

  deleteSubscription(id): Observable<any> {
    return this.apiService.delete(`stripe/delete-subscription/${id}`);
  }

  updateDefaultSource(params): Observable<any> {
    return this.apiService.put(`stripe/update-default-source`, params);
  }

  deleteCard(customer, card): Observable<any> {
    return this.apiService.delete(`stripe/delete-card/${customer}/${card}`);
  }

  getCustomerCards(id): Observable<any> {
    return this.apiService.get(`stripe/get-customer-card/${id}`);
  }

  addCard(params): Observable<any> {
    return this.apiService.post(`stripe/add-card`, params);
  }
}
