import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-supplier-dashboard',
  templateUrl: './supplier-dashboard.component.html',
  styleUrl: './supplier-dashboard.component.scss'
})
export class SupplierDashboardComponent {
  breadCrumbItems!: Array<{}>;
  private authFakeService = inject(AuthfakeauthenticationService);
  constructor(public router:Router){

  }
  ngOnInit(): void {
    console.log('current url',this.router.url)
    this.breadCrumbItems = [
      { label: 'Profile' },
      { label: 'Dashboard', active: true }
    ];

    window.scrollTo({top:0})
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
