import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from '../sign-in/sign-in.component';
import { CountryListService } from 'src/app/core/services/country-list.service';
import { SignupQuestionsModalComponent } from '../signup-questions-modal/signup-questions-modal.component';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { UserEnum } from 'src/app/core/enums/enum';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from 'src/app/shared/confirm-pass.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  @Input() signInType:any;
  userType = UserEnum;
  userProfileForm!: FormGroup
  countries: any[] = [];

  selectedCountry: any;

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private countryListService: CountryListService,
    private authFakeService:AuthfakeauthenticationService,
    private router:Router
  ) {
    this.countries = countryListService.getCountries();
  }

  
  validations = {
    lower: false,
    upper: false,
    number: false,
    length: false,
    special: false,
  };
  showPasswordValidation: boolean = false;
  showPasswordContain(show: boolean) {
    this.showPasswordValidation = show;
  }
  validatePassword() {
    const password = this.userProfileForm.get('password')?.value;
    const lowerCaseLetters = /[a-z]/;
    const upperCaseLetters = /[A-Z]/;
    const numbers = /[0-9]/;
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;

    this.validations.lower = lowerCaseLetters.test(password);
    this.validations.upper = upperCaseLetters.test(password);
    this.validations.number = numbers.test(password);
    this.validations.length = password.length >= 8;
    this.validations.special = specialCharacters.test(password);
  }

  ngOnInit() {
    // this.selectedCountry = 'India'
    const type = this.signInType
    debugger
    this.loadForm();
  }

  openSignInModal() {
    this.modal.close();
    const modalRef = this.modalService.open(SignInComponent, { size: 'xl', windowClass: 'modal-rounded', centered: true });
    // modalRef.componentInstance.id = id;
    modalRef.result.then(() => { }, () => { });
  }
 
  loadForm() {
    this.userProfileForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      password: ['',Validators.compose([Validators.required,this.noWhitespaceValidator()])],
      confirmPassword: ['', Validators.compose([Validators.required,this.noWhitespaceValidator()])],
      country: [, []],
    },{
      validator: ConfirmPasswordValidator("password", "confirmPassword")
    })
    this.userProfileForm?.get('country')?.setValue('India');
  }


  // no white space only in input 
  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { whitespace: true } : null;
    };
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { mismatch: true } : null;
  }

  signUp() {
    if (this.userProfileForm.valid) {
      this.signupCall()
    // if(this.signInType === this.userType.SELLER){
    //   this.signupCall();   //dynamic 
    // }else if(this.signInType === this.userType.BUYER){
    //   this.buyerSignupCall();   //dynamic 
    // }
    // else{
    //     this.modal.close();
    //     const modalRef = this.modalService.open(SignupQuestionsModalComponent,{backdrop:'static',centered:true})
    //     modalRef.componentInstance.emailId = this.userProfileForm.get('email')?.value
    //     modalRef.result.then(()=>{}, ()=>{})
    // }
  }else{
    this.userProfileForm.markAllAsTouched();
  }
  }
 
  // supplier signup 
  signupCall(){
    if (this.userProfileForm.valid) {
      const formGroup = this.userProfileForm.value
         let obj = {
          email: formGroup?.email,
          password : formGroup?.password,
          confirmPassword : formGroup?.confirmPassword,
          roles : [this.signInType],
          country : formGroup?.country,
         }
         this.authFakeService.signUp(obj).subscribe({
          next:(res:any)=>{
            if(res.success){
              if(this.signInType === this.userType.SELLER){
              let obj = {
                id: res?.data?.id,
                country:res?.data?.country,
                email:res?.data?.email,
              }
             this.router.navigate(['sell-now'],{queryParams: {data:JSON.stringify(obj)}});
             this.modal.close();
            }else{
              this.modal.close();
              this.authFakeService.openSignInModal(this.signInType);
            }
            }else{
               
            }
          }
         })
     }else{
        this.userProfileForm.markAllAsTouched();
      }
  }

loginBuyer(){
   this.authFakeService.buyerLoggin()
  }

  //  validations for form inputs
  isControlValid(controlName: string): boolean {
    const control = this.userProfileForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }
  
  isControlInvalid(controlName: string): boolean {
    const control = this.userProfileForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
  
  controlHasError(validation: string, controlName: string): boolean {
    const control = this.userProfileForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    const control = this.userProfileForm.controls[controlName];
    return control.dirty || control.touched;
  }

}
