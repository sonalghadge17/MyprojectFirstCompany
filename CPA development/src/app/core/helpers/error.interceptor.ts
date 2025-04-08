import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    currentUser: any;
    req: any

    constructor(    private router: Router,private authFackservice: AuthfakeauthenticationService,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   debugger
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authFackservice.logout();
                location.reload();
            }
            debugger
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
    refreshTokenAndRetry() {
        debugger;
        let currentUser: any = localStorage.getItem("currentUser");
        this.currentUser = JSON.parse(currentUser);
        console.log("Before", this.currentUser);
        this.req = {
          token:this.currentUser.token ,
        };
        this.authFackservice
          .refreshToken(this.req)
          .subscribe((response: any) => {
            debugger;
           let obj ={
            email:this.currentUser.email,
            firstName:this.currentUser.firstName,
            lastName:this.currentUser.lastName,
            mobileNo:this.currentUser.mobileNo,
            id:this.currentUser.id,
            token:response.token,                         
            status:this.currentUser.status,
            refreshToken:response.refreshToken,
            role:this.currentUser.role,
           }
            localStorage.setItem("currentUser", JSON.stringify(obj));
            console.log("After", this.currentUser);
          } ,(error)=>{
            this.authFackservice.logout();
            this.router.navigate(['/auth/login'])
          });
      }
    }
    

