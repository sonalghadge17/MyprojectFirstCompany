import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as csc from 'country-state-city';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrl: './account-setting.component.scss'
})
export class AccountSettingComponent {

  accountSettingForm!:FormGroup;
  selectedFile: any;
  imgurl: string | null | ArrayBuffer = '../../../../assets/account-setting-img.png';
  file!: File | Blob;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  statess: any[] = [];
  countryCode: any;
  stateCode: any;

  constructor(
    private fb: FormBuilder,
  ){}

  ngOnInit(){
    this.loadForm();
    this.getAllCountries();
  }

  getAllCountries() {
    // this.countries = csc.Country.getAllCountries();
    this.countries = csc.Country.getAllCountries();
  }
  onSelectCountry(event: any) {
    this.countryCode = event.isoCode;
    this.states = csc.State.getStatesOfCountry(event.isoCode)
    this.statess = csc.City.getAllCities(event.isoCode)
    console.log(this.statess)
  }
  onSelectState(event: any) {
    this.stateCode = event.isoCode;
    this.cities = csc.City.getCitiesOfState(this.countryCode, this.stateCode)
  }

  loadForm(){
    this.accountSettingForm = this.fb.group({
      file:[,],
      firstName:[,],
      lastName:[,],
      email:[,],
      phoneNo:[,],
      country:[,],
      state:[,],
      pinCode:[,],
      address:[,],
    })
  }

  uploadFileForLogo($event: any) {
    if ($event.target.name == 'logo') {
      let file = $event.target.files[0];
      this.file = file;
      if(file){
        this.selectedFile = file;
      }else{
        this.selectedFile = null;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.imgurl = reader.result;
      }
      
    }
  }
  RemoveLogoUrl() {
    this.file = null!;
    this.imgurl = '../../../../assets/images/dummy.jpg'
  }

}
