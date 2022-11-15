import {ApiService} from "../services/api.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";

@Injectable()

export class AuthService {

  constructor(
    private apiService: ApiService,
  ) { }

  login(params): Observable<any> {
    return this.apiService.post('auth/login', params);
  }

  sendResetPasswordEmail(params):Observable<any> {
    return this.apiService.post('auth/send-reset-password-email', params);
  }

  verifyToken(token): Observable<any> {
    return this.apiService.post('auth/verify-token', {token});
  }

  resetPassword(params): Observable<any> {
    return this.apiService.post('auth/reset-password', params);
  }
}
