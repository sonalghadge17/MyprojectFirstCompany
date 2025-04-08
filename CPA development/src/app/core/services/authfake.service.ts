import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/store/Authentication/auth.models';
import { environment } from 'src/environments/environment';
import { Path, subPath } from '../enum';
@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    /**
     * current user
     */
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
   
      // login(email: string, password: string) {
      //   debugger;
      //   return this.http
      //     .post<any>(environment.apiUrl + "/" + Path.USERS + "/" + subPath.ADMIN_LOGIN, {
      //       email,
      //       password,
      //     }).pipe( map((user) => {
      //         debugger;
      //         // login successful if there's a jwt token in the response
      //         if (user && user.data.token) {
      //           // store user details and jwt token in local storage to keep user logged in between page refreshes
      //           localStorage.setItem("toast", "true");
      //           localStorage.setItem("currentUser", JSON.stringify(user.data));
      //           this.currentUserSubject.next(user.data);
      //         }
      //         return user;
      //       })
      //     );
      // }
      login(email: string, password: string) {
        debugger;
        // const httpParams = new HttpParams()
        //   .set('email', userName)
        //   .set('password', password)
        return this.http
      
          .post<any>(environment.apiUrl + "/" + Path.USERS + "/" + subPath.ADMIN_LOGIN,{
            email,
            password,
          })
          .pipe(
            
            map(
              (res) => {
                //   return this.http.post<any>(`${environment.apiUrl}/${Path.USERS}/${SubPath.ADMIN_LOGIN}`, data1)
                // .pipe(map(res => {
    
                // login successful if there's a jwt token in the response
                if (res.data && res.data.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
    
                  localStorage.setItem("currentUser", JSON.stringify(res.data));
                  // extra code
                  localStorage.setItem("roleType", "IQAC");
                  this.currentUserSubject.next(res.data);
                }
                return res;
              },
              (error: any) => {
                return error;
              }
            )
          );
      }
      refreshToken(reqdto: any) {
        return this.http.post<any>(
          `${environment.apiUrl}/${Path.USERS}/${subPath.REFRESHTOKEN}`,
          reqdto
        );
      }
    /**
     * Logout the user
     */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null!);
    }
    // resetPassword(email: string, password: string) {
    //   debugger;
    //   const httpParams = new HttpParams()
    //     .set("email", email)
    //     .set("password", password);
    //   let url = `${environment.apiUrl}/${Path.USERS}/${subPath.CHANGE_PASSWORD}`;
    //   return this.http.post<any>(url, {}, { params: httpParams });
    // }

    resetPassword(email: string, otp: string,oldPassword:String, newPassword: string) {
      debugger
      const postData = {
        email: email,
        otp: otp,
        oldPassword:oldPassword,
        newPassword: newPassword
      };
      let url = `${environment.apiUrl}/${Path.USERS}/${subPath.RESET_PASSWORD}`;
      return this.http.post<any>(url, postData); 
    }
  //   sendotptoemail(email: any) {
  //     debugger
  //     const httpParams = new HttpParams()
  //     .set("email", email);
  //     let url = `${environment.apiUrl}/${Path.USERS}/${subPath.FORGOT_PASSWORD}`;
  //     return this.http.post<any>(url, {}, { params: httpParams });
     
  // }
  sendotptoemail(email: string,) {
    const postData = {
      email: email,
    };
    let url = `${environment.apiUrl}/${Path.USERS}/${subPath.FORGOT_PASSWORD}`;
    return this.http.post<any>(url, postData); 
  }
  // verifyOtpemail(email: string, otp: string) {
  //   debugger
  //   const httpParams = new HttpParams()
  //   .set("email", email)
  //   .set("otp", otp);
  //   let url = `${environment.apiUrl}/${Path.USERS}/${subPath.OTP_VERIFY}`;
  //   return this.http.post<any>(url, {}, { params: httpParams });
  // }

  verifyOtpemail(email: string, otp: string, newPassword: string) {
    const postData = {
      email: email,
      otp: otp,
      newPassword: newPassword
    };
    let url = `${environment.apiUrl}/${Path.USERS}/${subPath.OTP_VERIFY}`;
    return this.http.post<any>(url, postData); 
  }
}