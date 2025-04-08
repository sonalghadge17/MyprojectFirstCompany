import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from '../sign-in/sign-in.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CountryListService } from 'src/app/core/services/country-list.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-signup-questions-modal',
  standalone: true,
  imports: [CommonModule,NgSelectModule,FormsModule,ReactiveFormsModule],
  templateUrl: './signup-questions-modal.component.html',
  styleUrl: './signup-questions-modal.component.scss'
})
export class SignupQuestionsModalComponent {
  @Input() emailId!:string;
  name!:string;
  isEditMode:boolean = false;
  isEditModeDone:boolean = false;
  countIs = 0;
  countries: any[] = [];
  productList: any[] = [];
  selectedCountry: any;
  productJson = [
    {
      id:1,
      name:'Processed Food',
      imgUrl:'assets/sign-up/proc-food.png'
    },
    {
      id:2,
      name:'Dairy and Eggs',
      imgUrl:'assets/sign-up/eggs.png'
    },
    {
      id:3,
      name:'Meat and Poultry',
      imgUrl:'assets/sign-up/meat.png'
    },
    {
      id:4,
      name:'Vegetables',
      imgUrl:'assets/sign-up/veg.png'
    },
    {
      id:5,
      name:'Fish',
      imgUrl:'assets/sign-up/fish.png'
    },
  ]
  constructor(public modal:NgbActiveModal,
              private modalService:NgbModal,
              private countryListService: CountryListService,
              private router:Router,
              private authFakeService:AuthfakeauthenticationService
 
  ){
    this.countries = countryListService.getCountries();
  }
  ngOnInit(): void {
    this.selectedCountry = 'India'
    this.productList = this.productJson.map((item:any)=>{
      item.isChecked = false;
      return item;
    })
  }

  getName(email:string):string{
    this.name = email.split('@')[0];
    return email.split('@')[0];
  }
  editName(){
    this.isEditMode = true;
    this.isEditModeDone = true;
  }
  onSaveName(newName:any){
    this.name = newName;
    this.isEditMode = false;
    const email = `${newName}@gmail.com`;
    this.emailId = email;
  }

  clickToNext(){
    this.countIs++;
    if(this.countIs == 3){
      this.modal.close();
      // this.authFakeService.sellerLoggin();
      // this.router.navigate(['/']);

    }
  }
  onSelectProduct(item:any){
   item.isChecked = true;
  }
  getFirstCharacter(){
    if(this.name){
       return this.name.split('')[0]
    }else{
      return 'O'
    }
  }

  openSignIn(){
    this.modal.close();
      const modalRef = this.modalService.open(SignInComponent, { size: 'xl', windowClass: 'modal-rounded', centered: true });
      // modalRef.componentInstance.id = id;
      modalRef.componentInstance.loginData = { email: 'sachin@gmail.com', password: 'sachin@123' }
      modalRef.result.then(() => { }, () => { });
  }
}
