import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ContractService} from "../../services/contract.service";
import {ToastService} from "../../services/toast.service";
import {ActivatedRoute} from '@angular/router';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-view-contract',
  templateUrl: './view-contract.component.html',
  styleUrls: ['./view-contract.component.scss']
})
export class ViewContractComponent implements OnInit {

  contract
  API_URL = environment.API_URL;
  componentInView = new Subject();

  constructor(
    private contractService: ContractService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(takeUntil(this.componentInView)).subscribe(params => {
      if (params.id && params.id !== '0') {
        this.getContractDetails(params.id);
      }
    });
  }

  getContractDetails(id): void {
    this.contractService.getContractById(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.contract = response.contract;
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  onDownloadDocumentClicked(): void {
    window.open(this.API_URL + 'public/files/' + this.contract.file.filename);
  }
}
