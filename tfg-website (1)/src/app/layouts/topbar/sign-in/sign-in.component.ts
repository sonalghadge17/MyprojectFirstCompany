import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserEnum } from 'src/app/core/enums/enum';
export class LoginData{
  username !: string;
  password !: string;
  clear(){
    this.username = ''
    this.password = ''
  }
};

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  loginData !:LoginData;
  @Input() signInType: any;
  userType = UserEnum;

  userProfileForm!: FormGroup
  countries = [
    { id: 1, name: 'India', flag: '🇮🇳' },
    { id: 2, name: 'United States', flag: '🇺🇸' },
    { id: 3, name: 'Canada', flag: '🇨🇦' },
    { id: 4, name: 'Australia', flag: '🇦🇺' }
  ];

  selectedCountry: any;

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private authFakeService: AuthfakeauthenticationService,
    private router:Router,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
      this.loadForm()
  }

  openSignUpModal() {
    this.modal.dismiss()
    const modalRef = this.modalService.open(SignUpComponent, { size: 'xl', windowClass: 'modal-rounded', centered: true });
    modalRef.componentInstance.signInType = this.signInType;
    modalRef.result.then(() => {}, () => { });
  }

  loadForm() {
    this.loginData = new LoginData()
    this.loginData.clear()
    this.userProfileForm = this.fb.group({
      username: [this.loginData.username, Validators.compose([Validators.required])],
      password: [this.loginData.password, [Validators.required, Validators.minLength(5)]],
    });
  }


  signIn() {
    if (this.userProfileForm.valid) {
      let obj = {
        username : this.userProfileForm.get('username')?.value,
        password : this.userProfileForm.get('password')?.value,
      }
      // this.modal.close()
      this.authFakeService.login(obj.username,obj.password).subscribe({
        next: (res: any) => {
          if (res.success) {
            let obj = {
              ...res.data,
              type:res.data.roles[0]
            }
            localStorage.setItem('currentUser', JSON.stringify(obj));
            localStorage.setItem('token', res.data.token);
            this.authFakeService.currentUserSubject.next(obj);
            if(res.data.roles[0] == this.userType.SELLER){
            this.router.navigate(['/supplier-dashboard/dashboard']);
            }else{
              this.router.navigate(['/']);
            }
            this.modal.close();
          }else{
            this.toastr.error(res.message);
          }
        },
        error:(err:any)=>{
          this.toastr.error(err || 'Something went wrong');
        }
      })
    } else {
      this.userProfileForm.markAllAsTouched();
    }
  }
  // modalclose() {
  //   if (this.userProfileForm.valid) {
  //     this.modal.close()
  //   } 

  // }

  isControlInvalid(controlName: string) {
    const control = this.userProfileForm.get(controlName);
    return control?.invalid && control?.touched;
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.userProfileForm.get(controlName);
    return control?.hasError(validation) && control?.touched;
  }

}
