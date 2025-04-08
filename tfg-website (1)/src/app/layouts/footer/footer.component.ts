import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserEnum } from 'src/app/core/enums/enum';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();
  currentUser:any;
  userTypes = UserEnum;
  constructor(private router:Router,
    private authFakeService:AuthfakeauthenticationService
  ) { 
    const currentUser = this.authFakeService.currentUserValue
    if(currentUser){
      this.currentUser = currentUser;
    }
  }

  ngOnInit(): void {
  }

  isHomeScreen(){
    return (this.router.url.includes('/home') && !(this.currentUser?.type == this.userTypes.BUYER) ) || this.router.url.includes('/country-product-details')
    && !(this.currentUser?.type == this.userTypes.BUYER); 
  }

}
