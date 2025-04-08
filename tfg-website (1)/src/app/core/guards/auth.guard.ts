import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Auth Services
import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';
import { environment } from '../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PasswordGetModalComponent } from 'src/app/shared/components/password-get-modal/password-get-modal.component';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  isVerified:any;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private authFackservice: AuthfakeauthenticationService,
        private modalService:NgbModal
    ) { 
     
    }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //     if (environment.defaultauth === 'firebase') {
    //         const currentUser = this.authenticationService.currentUser();
    //         if (currentUser) {
    //             // logged in so return true
    //             return true;
    //         }
    //     } else {
    //         const currentUser = this.authFackservice.currentUserValue;
    //         if (currentUser) {
    //             // logged in so return true
    //             return true;
    //         }
    //         // check if user data is in storage is logged in via API.
    //         if(sessionStorage.getItem('currentUser')) {
    //             return true;
    //         }
    //     }
    //     // not logged in so redirect to login page with the return url
    //     this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    //     return false;
    // }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isVeri = localStorage?.getItem('isVerified')
        this.isVerified = JSON.parse(isVeri!)
        debugger
        // Always return true to allow access without checking for authentication
        if(!this.isVerified){
            this.router.navigate(['password-protection']).then(()=>{
              const modalRef = this.modalService.open(PasswordGetModalComponent,{backdrop:'static', backdropClass: 'custom-backdrop',})
              modalRef.result.then(()=>{},()=>{})
            })
            return false;
          }else{
              return true;

          }
    }
}
