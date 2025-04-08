import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { catchError, first, of, Subscription } from "rxjs";
import { ChangePassword } from "./change-password";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ProfileUpdateService } from "../profile-update.service";
import { AuthfakeauthenticationService } from "src/app/core/services/authfake.service";
import { AuthenticationService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrl: "./change-password.component.scss",
})
export class ChangePasswordComponent {
  imgurl: string | null | ArrayBuffer =
    "../../../../assets/images/users/user-dummy-img.jpg";
  formGroup!: FormGroup;
  formData!: FormData;
  private subscriptions: Subscription[] = [];
  fileError: boolean = false;
  file: any;
  changePassword!: ChangePassword;
  currentUser!: any;
  id: any;
  profilefile: any;
  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private profileUpdateService: ProfileUpdateService,
    private authfackservice: AuthfakeauthenticationService,
    private authService: AuthenticationService

  ) {}
  ngOnInit(): void {
    debugger;
    const currentUser = this.authfackservice.currentUserValue;
    this.currentUser = currentUser;
    this.id = currentUser.id;
    this.changePassword = new ChangePassword();
    this.changePassword.clear();
    this.loadForm();
    this.loadProfile();
  }
  save() {
    this.updateAdmin();
  }
  loadProfile() {
    debugger;
      this.spinner.show();
      const sb = this.profileUpdateService
     .getProfileById(this.id)
        .pipe(
          first(),
          catchError((errorMessage) => {
            this.spinner.hide();
            return of(this.changePassword);
          })
        )
        .subscribe((res: any) => {
          this.changePassword = new ChangePassword();
          this.changePassword.clear();
          this.spinner.hide();
          this.changePassword.firstName = res.data.firstName;
          this.changePassword.mobileNo = res.data.mobileNo;
          this.changePassword.email = res.data.email;
          this.changePassword.lastName = res.data.lastName;
          // this.imgurl = res.data.profilePic;
          this.loadForm();
        });
      this.subscriptions.push(sb);
    }

  // updateAdmin() {
  //   debugger;
  //   // this.prepareData();
  //   const formData = this.formGroup.value;
  //   // let uploadfiledata: FormData = new FormData();
  //   // let request = JSON.stringify(this.changePassword);
  //   // uploadfiledata.append("AdminRequest", request);
  //   // uploadfiledata.append("adminProfilePic", this.file);
  //   this.profileUpdateService.updateAdmin(this.id, formData).subscribe((res: any) => {
  //     if (res.success) {
  //       this.toastr.success(res.message);
  //       this.file = null;
  //        this.router.navigate(['/dashboard']);
  //     } else {
  //       this.toastr.error(res.message);
  //     }
  //   });
  // }

  updateAdmin() {
    debugger;
    const formData = this.formGroup.value;
  
    this.profileUpdateService.updateAdmin(this.id, formData).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toastr.success(res.message);
          
          // Check if email has changed
          const updatedEmail = this.formGroup.get('email')?.value;
          if (this.currentUser.email !== updatedEmail) {
            this.toastr.warning('Email changed, logging out...');
            this.authfackservice.logout(); // Replace with your actual logout method
            this.authService.logout();
            window.location.reload();
          } else {
            this.file = null;
            this.router.navigate(['/dashboard']);
          }
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (error: any) => {
        this.toastr.error('An error occurred: ' + (error?.message || error));
      },
    });
  }
  



  uploadFileForProfilePhoto($event: any) {
    if ($event.target.name == "adminProfilePic") {
      let file = $event.target.files[0];
      this.file = file;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.imgurl = reader.result;
      };
    }
  }
  RemoveProfileUrl() {
    this.file = null!;
    this.imgurl = "../../../../assets/images/users/user-dummy-img.jpg";
  }
  loadForm() {
    const emailPattern =
      "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,63}";
    this.formGroup = this.fb.group({
      firstName: [
        this.changePassword.firstName,
        Validators.compose([Validators.required]),
      ],
      
      lastName: [
        this.changePassword.lastName,
        Validators.compose([Validators.required]),
      ],
      mobileNo: [
        this.changePassword.mobileNo,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
      ],
      email: [
        this.changePassword.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern(emailPattern),
        ]),
      ],
      password: [
        this.changePassword.password,
        Validators.compose([Validators.required]),
      ],
    });
  }
  prepareData() {
    debugger;
    const formData = this.formGroup.value;
    this.changePassword = formData;
  }
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
  controlHasError(validation: string, controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
  isControlTouched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}
