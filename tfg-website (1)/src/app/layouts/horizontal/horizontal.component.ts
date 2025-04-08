import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserEnum } from 'src/app/core/enums/enum';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss']
})

/**
 * Horizontal Component
 */
export class HorizontalComponent implements OnInit {

  backgroundColor: string = '#e4eaf7';
  currentUser:any;
  userTypes = UserEnum;

  constructor(private router: Router,
              private authFakeService:AuthfakeauthenticationService
  ) { 
    const currentUser = this.authFakeService.currentUserValue
    if(currentUser){
      this.currentUser = currentUser;
    }
  }

  isCondensed = false;

  ngOnInit(): void {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.updateBackgroundColor(event.urlAfterRedirects);
    //   }
    // });
    // this.updateBackgroundColor(this.router.url);
  }

  isHomeScreen(){
    return (this.router.url.includes('/home') && !(this.currentUser?.type == this.userTypes.BUYER) ) || this.router.url.includes('/country-product-details')
    && !(this.currentUser?.type == this.userTypes.BUYER); 
  }

 

  // private updateBackgroundColor(url: string): void {
  //   switch (url) {
  //     case '/home':
  //       this.backgroundColor = '#e4eaf7';
  //       break;
  //     case '/sell-now':
  //       this.backgroundColor = '#ffffff';
  //       break;
  //     case '/our-mission':
  //       this.backgroundColor = '#ffffff';
  //       break;
  //     default:
  //       this.backgroundColor = '#ffffff';
  //       break;
  //   }
  // }


  /**
   * on settings button clicked from topbar
   */
  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
    const rightBar = document.getElementById('theme-settings-offcanvas');
    if (rightBar != null) {
      rightBar.classList.toggle('show');
      rightBar.setAttribute('style', "visibility: visible;");
    }
  }

  /**
   * On mobile toggle button clicked
   */
  onToggleMobileMenu() {
    if (document.documentElement.clientWidth <= 1024) {
      document.body.classList.toggle('menu');
    }
  }
}
