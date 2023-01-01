import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(
    private apiService: ApiService
  ) {
  }

  createContract(params): Observable<any> {
    const formDate = new FormData();

    for (let key in  params) {
      formDate.append(key, params[key]);
    }

    return this.apiService.post(`contracts/create-contract`, formDate);
  }

  updateContract(params): Observable<any> {
    const formDate = new FormData();

    for (let key in  params) {
      formDate.append(key, params[key]);
    }

    return this.apiService.put(`contract/update-contract`, params);
  }

  getContracts(): Observable<any> {
    return this.apiService.get(`contracts/get-contracts`);
  }

  getContractById(id): Observable<any> {
    return this.apiService.get(`contracts/get-contract-by-id/${id}`);
  }

  updateContractStatus(id, status): Observable<any> {
    return this.apiService.put(`contracts/update-contract-status/${id}`, status);
  }

  getContractsByUserId(userId): Observable<any> {
    return this.apiService.get(`contracts/get-contracts-by-user-id/${userId}`);
  }

  contractSigned(contractId): Observable<any> {
    return this.apiService.put(`contracts/contract-signed`, {contractId: contractId});
  }
}
