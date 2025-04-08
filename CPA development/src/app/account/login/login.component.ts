import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Login Auth
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { first } from 'rxjs/operators';
import { ToastService } from './toast-service';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/Authentication/authentication.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;

  toast!: false;
  loading!: boolean;
  // set the current year
  year: number = new Date().getFullYear();

  constructor(private spinner: NgxSpinnerService,private toastr: ToastrService,private formBuilder: UntypedFormBuilder,private authenticationService: AuthenticationService,private router: Router,
    private authFackservice: AuthfakeauthenticationService, private route: ActivatedRoute, public toastService: ToastService,
    private store: Store) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
     }
  ngOnInit(): void {
      /**
     * Form Validatyion
     */
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],//admin@themesbrand.com
        password: ['', [Validators.required]],//123456
      });
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    debugger;
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.spinner.show();
      this.loading! = true;
      this.authFackservice
        .login(this.f["email"].value, this.f["password"].value)
        .subscribe(
          (res) => {
            this.loading = false;
            this.spinner.hide();
            if (res.success) {
              this.toastr.success("Successfully Logged In.","Success!");
              this.router.navigate(["/dash"])
            } else {
              debugger
              this.toastr.error(res.message);
            }
          },
          (error: any) => {
            debugger
            this.spinner.hide()
            this.loading = false;
            // this.error = error ? error : "";
            this.toastr.error(error);
          }
        );
    }
  }

  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
