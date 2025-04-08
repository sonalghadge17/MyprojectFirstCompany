import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.scss'
})
export class BuyerDashboardComponent {
  breadCrumbItems!: Array<{}>;
  private authFakeService = inject(AuthfakeauthenticationService);

  constructor(public router:Router){

  }
  ngOnInit(): void {
    // console.log('current url',this.router.url)
    this.breadCrumbItems = [
      { label: 'Profile' },
      { label: 'Dashboard', active: true }
    ];
  }

  redirectTo(activeLabel:string){
    this.breadCrumbItems = [
      { label: 'Profile' },
      { label: activeLabel, active: true }
    ];
  }
  
  // check current opened url
  isActiveUrl(currentUrl:any):boolean{
    const isUrl = this.router.url === currentUrl
    return this.router.url === currentUrl; 
  }


  logout(){
    this.authFakeService.logout();
  }
}
