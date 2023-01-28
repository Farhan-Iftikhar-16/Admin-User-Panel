import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, PatternValidator, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {UtilService} from "../../services/util.service";
import {ToastService} from "../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user/user.service";
import {ContractService} from "../../services/contract.service";

@Component({
  selector: 'app-edit-contract',
  templateUrl: './edit-contract.component.html',
  styleUrls: ['./edit-contract.component.scss']
})
export class EditContractComponent implements OnInit {

  user;
  users;
  consentRequiredURL;
  uploadDocumentName;
  createdContractDocKey;
  form: FormGroup;
  maxDate = new Date();
  contractTypes = [
    {label: 'Pre Order', value: 'PREORDER'},
    {label: 'Subscriptions', value: 'SUBSCRIPTIONS'},
    {label: 'Delivery Order', value: 'DELIVERY_ORDER'},
  ];
  intervalOptions = [
    {label: 'Day(s)', value: 'DAY'},
    {label: 'Week(s)', value: 'WEEK'},
    {label: 'Month(s)', value: 'MONTH'},
    {label: 'Year(s)', value: 'YEAR'}
  ];
  isConsentRequired = false;
  componentInView = new Subject();
  @ViewChild('autoComplete') autoComplete: ElementRef;
  @ViewChild('fileUpload') fileUpload: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private contractService: ContractService,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.createForm();

    this.activatedRoute.params.pipe(takeUntil(this.componentInView)).subscribe(params => {
      if (params.id && params.id !== '0') {
        this.getContractDetails(params.id);
      }
    });

    this.activatedRoute.queryParams.pipe(takeUntil(this.componentInView)).subscribe(queryParams => {
      console.log(queryParams);
      if (queryParams.error && queryParams.error === 'access_denied') {
        this.toastService.error(queryParams.error_message);
        return;
      }

      if (queryParams.code) {
        const contract = localStorage.getItem('contractID');
        if (contract) {
          this.createContractSigningURL(contract);
        }
      }
    })
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      type: ['', Validators.required],
      userId: ['', Validators.required],
      file: ['', Validators.required],
      interval: ['', Validators.required],
      intervalCount: ['', Validators.required],
      price: ['', Validators.compose([Validators.required, Validators.pattern('^[\\d\\.,]+$')])],
      contractDate: [{value: new Date(), disabled: true}, Validators.required]
    });
  }

  getContractDetails(id): void {
    this.contractService.getContractById(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.form.patchValue(response.contract);
      this.form.get('id').setValue(response.contract._id);
      this.autoComplete['inputEL']['nativeElement']['value'] = response.contract.userId;
      this.uploadDocumentName = response.contract.file.originalname;
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  searchUsers(event): void {
    this.userService.getUsers(event.query).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.users = response.users;
    }, error => {
      this.toastService.error(error.error.message);
    })
  }

  onFileSelect(event): void {
    this.form.get('file').setValue(event.currentFiles[0]);
  }

  onSaveChangesClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
      return;
    }

    let params = {
      ...this.form.value,
    };

    !params.id ? this.createContract(params) : this.updateContract(params);
  }

  createContract(params): void {
    this.contractService.createContract(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
      if (response.type === 'CONSENT_REQUIRED') {
        this.isConsentRequired = true;
        this.consentRequiredURL = response.consentRequiredURL;
        localStorage.setItem('contractID', response.id);
        return;
      }
      this.router.navigate(['/admin/contracts']).then();
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  updateContract(params): void {
    this.contractService.updateContract(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
      this.router.navigate(['/admin/users']).then();
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  onRedirectClicked(): void {
    const link = document.createElement('a');
    link.href = this.consentRequiredURL;
    link.click();
    link.remove();
    return;
  }

  createContractSigningURL(contractId): void {
    this.contractService.createContractSigningURL(contractId).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
      this.router.navigate(['/admin/contracts']).then();
    }, error => {
      this.toastService.error(error.error.message);
    });
  }
}
