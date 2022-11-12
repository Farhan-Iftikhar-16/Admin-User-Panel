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
}
