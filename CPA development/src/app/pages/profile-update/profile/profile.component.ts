import { Component, ViewChild } from '@angular/core';
import { Profile } from './profile';
import { ChangePassword } from '../change-password/change-password';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, first, of, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileUpdateService } from '../profile-update.service';
import { ConfirmPasswordValidator } from '../confirm-password.validator';
import { SwiperComponent, SwiperDirective } from "ngx-swiper-wrapper";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profile!: Profile;
  changePassword!:ChangePassword;
   formGrouptt!: FormGroup;
   private subscriptions: Subscription[] = [];
   imgurl: ArrayBuffer | null | string =
     "../../../../assets/images/users/user-dummy-img.jpg";
   fileError: boolean = false;
   file: any;
   formData!: FormData;
   currentUser!: any
   profilePic: any = "";
   adminList: any[] = [];
   public passwordTextType: boolean | undefined;
   public passwordConfirmTextType: boolean | undefined;
   public passwordoldTextType: boolean | undefined;
   @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;
   @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
   imgUrl: any;
   name1: any;
   address1: any;
   id: any;
   constructor(
     private fb: FormBuilder,
     private spinner: NgxSpinnerService,
     private toastr: ToastrService,
     private authfackservice: AuthfakeauthenticationService,
     private profileUpdateService:ProfileUpdateService
   ) {}
   ngOnInit(): void {
     const currentUser = this.authfackservice.currentUserValue;
     this.currentUser = currentUser;
     this.id = currentUser.id;
     this.loadProfile();
     this.loadForm();
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
           return of(this.profile);
         })
       )
       .subscribe((res: any) => {
         this.changePassword = new ChangePassword();
         this.changePassword.clear();
         this.spinner.hide();
         this.changePassword.firstName = res.data.firstName;
         this.changePassword.lastName = res.data.lastName;
         this.changePassword.mobileNo = res.data.mobileNo;
         this.changePassword.email = res.data.email;
         this.imgurl = res.data.profilePic;
       });
     this.subscriptions.push(sb);
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
   savePassword() {
     debugger;
     let obj = {
      email:this.currentUser.email,
      oldPassword:this.formGrouptt.get('oldPassword')?.value,
      newPassword:this.formGrouptt.get('newPassword')?.value,
     }
     const sbCreate = this.profileUpdateService
       .changePassword(obj)
       .subscribe(
         (res: any) => {
           if (res.success) {
             this.toastr.success(res.message);
             this.loadForm();
           } else {
             this.toastr.error(res.message);
           }
         },
         (error:any) => {
          //  this.spinner.hide();
           this.toastr.error(error);
         }
       );
     this.subscriptions.push(sbCreate);
   }
   loadForm() {
     this.profile = new Profile();
     this.profile.clear();
     this.formGrouptt = this.fb.group(
       {
         id: [this.id],
         oldPassword: [
           this.profile.oldPassword,
           Validators.compose([Validators.required]),
         ],
         newPassword: [
           this.profile.newPassword,
           Validators.compose([Validators.required]),
         ],
         cPassword: ["", Validators.compose([Validators.required])],
       },
       {
         validator: ConfirmPasswordValidator("newPassword", "cPassword"),
       }
     );
   }
 
   // helpers for View
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
 }
 