import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { ConfirmPasswordValidator } from 'src/app/core/confirm-password.validator (1)';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})

/**
 * Pass-Reset Basic Component
 */
export class BasicComponent implements OnInit {

  passresetForm!: FormGroup;
  submitted = false;
  fieldTextType!: boolean;
  showOtp: boolean = false;
  error = '';
  seconds = 90;
  otp: string = "";
  msg: any;
  stop: any;
  email: any;
  newPassword:any
  otpVerified: boolean = false;
  successmsg!: boolean;
  returnUrl!: string;
  // set the current year
  year: number = new Date().getFullYear();
  isVerified: boolean = false;
  loading = false;
  public passwordTextType: boolean | undefined;
  public passwordConfirmTextType: boolean | undefined;
  intervalId = 0;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
    inputStyles: {
      width: "38px",
      height: "38px",
    },
  };
  constructor(private formBuilder: FormBuilder,  private router: Router, private toastr: ToastrService,private authfakeService: AuthfakeauthenticationService,) { }
  ngOnInit(): void {
    /**
     * Form Validatyion
     */
     this.passresetForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      newPassword:['',Validators.required],
      cPassword:['',Validators.required]
    },
    {
      validator: ConfirmPasswordValidator("newPassword", "cPassword")
    });
 
  }
  ngAfterViewChecked() {
    console.log(this.passresetForm.controls['cPassword'].errors);
}
  // convenience getter for easy access to form fields
  get f() { return this.passresetForm.controls; }

  /**
   * Form submit
   */
 
  verifyOtp() {
    debugger;
    if (this.otp.length !== 6) {
      return;
    }
    this.loading = true;
    let postData = {
      email:this.email = this.passresetForm.get('email')?.value,
      otp: this.otp,
      newPassword: this.passresetForm.get('newPassword')?.value
    };
    this.authfakeService
      .verifyOtpemail(postData.email, postData.otp, postData.newPassword)
      .pipe(first())
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.toastr.success(res.message);
            this.otpVerified = true; 
            this.showOtp = false;  
          } else {
            this.toastr.error(res.message);
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
  sendOtp() {
    debugger
    this.msg = 'Verification code sent on your email'
    this.showOtp = true

    let postData = {
      email:this.email = this.passresetForm.get('email')?.value,
     
    };
    this.authfakeService.sendotptoemail(postData.email,).subscribe(data => {
      if (data.success) {
        this.toastr.success(data.message);
        this.email = this.passresetForm.get('email')?.value,
        this.otp = '';
        this.showOtp = true;
        this.seconds = 90;
      } else {
        this.toastr.error(data.message);
      }
    },
    (error: any) => {
      this.toastr.error('Failed to send OTP. Please try again later.');
      console.error(error);
    }
  );
}
  onOtpChange(otp: any) {
    this.otp = otp;
  }
  clearTimer() {
    clearInterval(this.intervalId);
  }
  toggleConfirmPasswordTextType() {
    this.passwordConfirmTextType = !this.passwordConfirmTextType;
  }
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  onSubmit() {
    debugger
    this.submitted = true;
    if (this.passresetForm.invalid) {
      return;
    }
    // if (!this.isVerified) {
    //   this.toastr.error('Please verify your email');
    //   return;
    // }
    const req = {
      otp: this.otp,
      email: this.passresetForm.get('email')?.value,  
      newPassword: this.passresetForm.get('newPassword')?.value,
      oldPassword: this.passresetForm.get('oldPassword')?.value
    };
    this.authfakeService.resetPassword(req.email, req.otp, req.oldPassword, req.newPassword).subscribe(
      (data: any) => {
        this.successmsg = true;
        if (data.success) {
          this.toastr.success(data.message);
          this.router.navigate(['/auth/login']);
        }else{
          this.toastr.error(data.message); 
        }
      },
      (error: any) => {
        this.error = error ? error : '';
      });
  }
    }
  



