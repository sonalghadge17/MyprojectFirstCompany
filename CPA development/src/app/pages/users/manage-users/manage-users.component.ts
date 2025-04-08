import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmPasswordValidator } from '../../profile-update/confirm-password.validator';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent {
  @Input() id!: any;
  // User!: User;
  subcategoryList: any;
  categoryList: any;
  categoryId!: number;
  subcategoryId!: number;
  formGrouptt!: FormGroup;
moduleList: { label: string, isCheck?: boolean}[] = [
    { label: 'DASHBOARD',isCheck:false },
    { label: 'DEAL',isCheck:false },
    { label: 'SUPPLIER', isCheck:false},
    { label: 'CATEGORY', isCheck:false},
    { label: 'PRODUCT', isCheck:false},
    { label: 'REQUESTED_PRODUCT', isCheck:false},
    { label: 'BUYER', isCheck:false},
    { label: 'MASTER', isCheck:false}
  ];
  public passwordTextType: boolean | undefined;
  public passwordConfirmTextType: boolean | undefined;
  public passwordoldTextType: boolean | undefined;
  isUpdate: boolean=false;
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    public userservice: UsersService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal
  ) {}
  ngOnInit(): void {
    // this.User = new User();
    // this.User.clear();
    this.loadForm();
    if(this.id){
      this.getServiceById();
    }
   
  }
  save() {
    debugger
    if (this.id) {
      this.updateData();
    } else {
      this.saveData();
    }
  }
  saveData() {
    debugger;
    let obj = {
      firstName: this.formGrouptt.get("firstName")?.value,
      lastName: this.formGrouptt.get("lastName")?.value,
      email: this.formGrouptt.get("email")?.value,
      mobileNo: this.formGrouptt.get("mobileNo")?.value,
      password: this.formGrouptt.get("password")?.value,
      // cPassword: this.formGrouptt.get("cPassword")?.value,
     
    };
    this.spinner.show();
    this.userservice.Save_User(obj).subscribe(
      (res: any) => {
        if (res.success === true) {
          this.toastr.success(res.message);
          this.spinner.hide();
          this.modal.dismiss();
        } else {
          this.toastr.error(res.message);
          this.spinner.hide();
        }
      },
      (error: any) => {
        this.toastr.error(error);
        this.spinner.hide();
      }
    );
  }

  //getbyid
  getServiceById() {
    debugger;
    this.spinner.show();
    const sb = this.userservice.userGet_ById(this.id).subscribe(
      (res: any) => {
        this.spinner.hide();
        console.log(res.data);
        if (res.success) {
          debugger;
          // this.User = new User();
          // this.User.clear();
          // this.User = res.data
          this.isUpdate = !!this.formGrouptt.get('email')?.value;
          this.formGrouptt.get("firstName")?.setValue(res.data.firstName);
          this.formGrouptt.get("lastName")?.setValue(res.data.lastName);
          this.formGrouptt.get("email")?.setValue(res.data.email);
          this.formGrouptt.get("mobileNo")?.setValue(res.data.mobileNo);
          this.formGrouptt.get("password")?.setValue(res.data.password);
          // this.formGrouptt.get("cPassword")?.setValue(res.data.cPassword);
        }
      },
        // (error: any) => {
        //   this.spinner.hide();
        //   console.error("Error loading institute details", error);
        // }
    );
  }
  updateData() {
    debugger;
    let obj = {
      id: this.id, 
      firstName: this.formGrouptt.get("firstName")?.value,
      lastName: this.formGrouptt.get("lastName")?.value,
      email: this.formGrouptt.get("email")?.value,
      mobileNo: this.formGrouptt.get("mobileNo")?.value,
      password: this.formGrouptt.get("password")?.value,
      // cPassword: this.formGrouptt.get("cPassword")?.value,
     
    };
    this.spinner.show();
    this.userservice.Update_User(this.id, obj).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          this.modal.close();
        } else {
          this.toastr.error(res.message);
          this.modal.close();
        }
      },
      (error: { error: { message: any; }; }) => {
        this.spinner.hide();
        if (error.error && error.error.message) {
          this.toastr.error(error.error.message);
        } else {
          this.toastr.error("Something went wrong.");
        }
      }
    );
  }
  managedata() {
    debugger;
    const formData = this.formGrouptt.value;
    delete formData.confirm;
  }
  
 
  loadForm() {
    this.formGrouptt = this.fb.group({
      firstName: [ '',Validators.compose([Validators.required]),],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)],)],
      mobileNo: ['',],
      password: ['', Validators.compose([Validators.required])],
      cPassword: ['', Validators.required]
    },
      {
        validator: ConfirmPasswordValidator("password", "cPassword")
      });
   
  }
  toggleOldPasswordTextType() {
    this.passwordoldTextType = !this.passwordoldTextType;
  }
  toggleConfirmPasswordTextType() {
    this.passwordConfirmTextType = !this.passwordConfirmTextType;
  }
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  isControlValid(controlName: string): boolean {
    const control = this.formGrouptt.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.formGrouptt.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
  controlHasError(validation: string, controlName: string): boolean {
    const control = this.formGrouptt.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
  isControlTouched(controlName: string): boolean {
    const control = this.formGrouptt.controls[controlName];
    return control.dirty || control.touched;
  }
  showcheckMain(i: number) {
    // this.moduleList[i].isCheck = !this.moduleList[i].isCheck
  }

  showcheckSub(i: number, j: number) {
    // this.moduleList[i].subItems[j].isCheck = !this.moduleList[i].subItems[j].isCheck
  }
}

