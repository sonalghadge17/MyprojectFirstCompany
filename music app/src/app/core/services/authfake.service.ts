import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/store/Authentication/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')!));
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
    login(email: string, password: string) {
        debugger;
        // const httpParams = new HttpParams()
        //   .set('email', userName)
        //   .set('password', password)
        return this.http
      
          .post<any>('http://192.168.1.37:9099/uru-api-service/users/admin-login',{
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
                //   sessionStorage.setItem("currentUser", JSON.stringify(res.data));
                  // extra code
                //   localStorage.setItem("roleType", "IQAC");
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

    /**
     * Logout the user
     */
    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('roleType');

        this.currentUserSubject.next(null!);
    }
}
