import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../payment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { Payment } from '../payment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.scss'
})
export class AddPaymentComponent {
  @Input() id!: any;
  payment!: Payment;
  formGroup!: FormGroup;
  isLoading: boolean = false; 
  formData!: FormData;
  requestData: any;
  public search: string = "";
  private subscriptions: Subscription[] = [];
  serviceList: any;
  listLength: any;
  currentUser:any
  requestBody!: {
    isPagination: number;
    searchTerm: string;
    pageNo: number;
    pageSize: number;
    sortBy: string;
    sortorder: string;
  };
  isSaveButtonEnabled: boolean = false;
  userList:any
  itemsPerPage = 3;
  pageNo = 1;
  image!: string;
  Milestone_form!: FormGroup;
  file: any = "";
  status: any
  role: any;
milestones: any;
  constructor(
    public modal: NgbActiveModal,
    private toaster: ToastrService,
    private paymentService: PaymentService,
    public modalService: NgbModal,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private authFackservice: AuthfakeauthenticationService
  ) {
    const currentUser = this.authFackservice.currentUserValue;
    if (currentUser) {
      this.currentUser = currentUser;
    }
  }
  ngOnInit() {
    this.payment = new Payment();
    this.payment.clear();
    this.requestBody = {
      isPagination: 1,
      pageNo: this.pageNo - 1,
      pageSize: this.itemsPerPage,
      sortBy: 'id',
      sortorder: 'ASC',
      searchTerm: this.search,
    };
    this.loadForm();
    this.loadFormArray( )
    this.getAllUser()
    if(this.id){
      this.getServiceById();
    }
    // this.addMilestone();
   
   
  }
  customSearchFunction(term: string, item: any): boolean {
    if (!term) {
      return true;
    }
    term = term.toLowerCase();
    return (
      item.firstName.toLowerCase().includes(term) ||
      item.lastName.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term)
    );
  }
  getAllUser() {
    debugger
    let requestBody = {
        isPagination: 0,
        pageNo: this.pageNo - 1,
        pageSize: this.itemsPerPage,
        orderBy: "id",
        sortBy: "lastModifiedDate",
        searchTerm: this.search,
        status: "ACTIVE",
        role: this.role || "",
    }
    this.spinner.show();
    const sbGetAll = this.paymentService
      .getallUser(requestBody)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.success) {
            this.userList = res.data;
            
          } else {
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error(error);
        }
      );
  }

  onTotalAmountChange(): void {
    this.checkAmounts();
  }

  onMilestoneAmountChange(): void {
    this.checkAmounts();
  }

  checkAmounts(): void {
    this.formGroup.updateValueAndValidity(); // Update form validity
  }
  isAmountsMatching(): boolean {
    const totalMilestoneAmount = this.milestone_Controls.controls.reduce((sum, group) => {
      const milestoneAmount = group.get('milestoneAmount')?.value;
      return sum + (milestoneAmount ? parseFloat(milestoneAmount) : 0);
    }, 0);
    const totalAmount = this.formGroup.get('totalAmount')?.value;
    return totalMilestoneAmount === parseFloat(totalAmount);
  }


  Save_Payment() {
    if (!this.id) {
      this.saveData();
    } else {
      this.Update_Payment();
    }
  }
  saveData(): void {
    debugger
    this.isLoading = true;
    // if (this.formGroup.invalid) {
    //   this.toaster.error('Please fill in all required fields.');
    //   return;
    // }userId
    this.requestData = this.formGroup.value;
    const formData = this.Milestone_form.value.milestoneRequests;
    this.requestData.lastSeqCount = formData.length;
    
    let obj = {
      // ...this.requestData,
      
   ...this.requestData,
      milestoneRequests: formData,
     
    };
    this.paymentService.Save_Payment(obj).subscribe(
      (res: any) => {
        debugger
        if (res.success) {
        
          this.toaster.success(res.message);
          this.isLoading = false;
          this.modal.close();
        } else {
          this.toaster.error(res.message);
          this.spinner.hide();
        }
      },
      (error) => {
        this.toaster.error(error);
        // console.error(error);
        this.isLoading = false;
      }
    );
  }


 

  Update_Payment(): void {
    debugger
    this.isLoading = true;
    // if (this.formGroup.invalid) {
    //   this.toaster.error('Please fill in all required fields.');
    //   return;
    // }userId
    this.requestData = this.formGroup.value;
    const formData = this.Milestone_form.value.milestoneRequests;
    this.requestData.lastSeqCount = formData.length;
    
    let obj = {
      // ...this.requestData,
      
   ...this.requestData,
      milestoneRequests: formData,
     
    };
    this.paymentService.updatePayment(obj,this.id).subscribe(
      (res: any) => {
        debugger
        if (res.success) {
        
          this.toaster.success(res.message);
          this.isLoading = false;
          this.modal.close();
        } else {
          this.toaster.error(res.message);
          this.spinner.hide();
        }
      },
      (error) => {
        this.toaster.error(error);
        // console.error(error);
        this.isLoading = false;
      }
    );
  }

  


addMilestone() {
  this.milestone_Controls.push(this.createMilestoneGroup());
  this.setMilestoneSequence();
  this.isAmountsMatching();  // Revalidate when a milestone is added
}


setMilestoneSequence(): void {
  this.milestone_Controls.controls.forEach((group, index) => {
    group.get('sequence')?.setValue(index + 1);  // Sequence starts from 1
  });
}
createMilestoneGroup(): FormGroup {
  debugger
  const milestoneIndex = this.milestone_Controls.length + 1;
  return new FormGroup({
    
    milestoneName: new FormControl(`Milestone ${milestoneIndex}`, [Validators.required]),
    milestoneAmount: new FormControl('', [Validators.required]),
    shippingAndHandlingAmount:new FormControl('', [Validators.required]),
    tax:new FormControl('', [Validators.required]),
    sequence: new FormControl('', [Validators.required]),
  });
}
  submitMilestone() {
    debugger;
    console.log(this.Milestone_form.value);
  }
  removeMilestone(index: number) {
    this.milestone_Controls.removeAt(index);
  }
  get milestone_Controls() {
    return this.Milestone_form.get("milestoneRequests") as FormArray;
  }

  loadFormArray() {
    this.Milestone_form = this.fb.group({
      milestoneRequests: this.fb.array([]),
    });
  }
  loadForm() {
    this.formGroup = this.fb.group({
      userId:[this.payment.userId],
      label: [this.payment.label, Validators.compose([Validators.required])],
      totalAmount: [this.payment.totalAmount, Validators.compose([Validators.required])],
     
      milestoneRequests: this.fb.array([]),
    });
  }


  loadMilestoneFormArray(milestones: any[]) {
    debugger
    const milestoneFormArray = this.Milestone_form.get('milestoneRequests') as FormArray;
    milestones.forEach(milestone => {
      milestoneFormArray.push(this.createMilestoneGroupFromData(milestone));
    });
  }
  createMilestoneGroupFromData(data: any): FormGroup {
    return this.fb.group({
      id: [data.id],
      milestoneName: [data.milestoneName, Validators.required],
      milestoneAmount: [data.milestoneAmount, Validators.required],
      shippingAndHandlingAmount: [data.shippingAndHandlingAmount , Validators.required],
      tax: [data.tax, Validators.required],
      paymentStatus: [data.paymentStatus],
      sequence: [data.sequence, Validators.required],
      createdDate: [data.createdDate],
    });
  }
   getServiceById() {
      debugger;
      this.spinner.show();
     this.paymentService.Payment_Show_By_Id(this.id).subscribe(
        (res: any) => {
          this.spinner.hide();
          console.log(res.data);
          if (res.success) {
            debugger;
           
            this.payment = res.data
            this.loadForm()
            this.loadMilestoneFormArray(res.data.milestoneResponses);
            // this.isUpdate = !!this.formGrouptt.get('email')?.value;
            // this.formGrouptt.get("firstName")?.setValue(res.data.firstName);
            // this.formGrouptt.get("lastName")?.setValue(res.data.lastName);
            // this.formGrouptt.get("email")?.setValue(res.data.email);
            // this.formGrouptt.get("mobileNo")?.setValue(res.data.mobileNo);
            // this.formGrouptt.get("password")?.setValue(res.data.password);
            // // this.formGrouptt.get("cPassword")?.setValue(res.data.cPassword);
          }
        },
          // (error: any) => {
          //   this.spinner.hide();
          //   console.error("Error loading institute details", error);
          // }
      );
    }

  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
  controlHasError(validation: any, controlName: any): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
  isControlTouched(controlName: any): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
  isControlInvalidForMilestone(index: number, controlName: string): boolean {
    const milestoneFormGroup = this.milestone_Controls.at(index);
    if (!milestoneFormGroup) {
      return false;  // The form group at this index does not exist
    }
    
    const control = milestoneFormGroup.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
  get shippingAndHandlingAmountValid(): boolean {
    const control = this.formGroup.get('shippingAndHandlingAmount');
    // Ensure the return type is always a boolean
    return control ? control.valid && control.value !== null && control.value !== '' : false;
  }
  controlHasErrorForMilestone(index: number, validation: string, controlName: string): boolean {
    const milestoneFormGroup = this.milestone_Controls.at(index);
    if (!milestoneFormGroup) {
      return false;  // Return false if the form group is undefined
    }
  
    const control = milestoneFormGroup.get(controlName);
    if (!control) {
      return false;  // Return false if the control is undefined
    }
  
    return control.hasError(validation) && (control.dirty || control.touched);
  }
}
