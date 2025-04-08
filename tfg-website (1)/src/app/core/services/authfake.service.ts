import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/store/Authentication/auth.models';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiUrlEnum } from '../enums/enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from 'src/app/layouts/topbar/sign-in/sign-in.component';

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {

    public currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    private router = inject(Router);
    constructor(private http: HttpClient,private modalService:NgbModal) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    /**
     * current user
     */
    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    /**
     * Performs the auth
     * @param username username of user
     * @param password password of user
     */
    login(username: string, password: string) {
        return this.http.post<any>(`${environment.userApiUrl}/api/auth/signin`,{ username, password })
        // .pipe(map(user => {
        //     // login successful if there's a jwt token in the response
        //     if (user && user.token) {
        //         // store user details and jwt token in local storage to keep user logged in between page refreshes
        //         localStorage.setItem('toast', 'true');
        //         localStorage.setItem('currentUser', JSON.stringify(user));
        //         this.currentUserSubject.next(user);
        //     }
        //     return user;
        // }));
    }

    // api/auth/signin

    
    // temporary login
    buyerLoggin() {
        let obj = {
            type: 'BUYER',
            name: 'Sachin R',
        }
        localStorage.setItem('currentUser', JSON.stringify(obj));
        this.currentUserSubject.next(obj);
        location.reload()
    }

    sellerLoggin() {
        let obj = {
            type: 'SELLER',
            name: 'Ganesh S',
        }
        localStorage.setItem('currentUser', JSON.stringify(obj));
        this.currentUserSubject.next(obj);
        this.router.navigate(['sell-now']).then(() => {
            location.reload()
        })
    }

    // signup
    signUp(req:any){
        let url = `${environment.userApiUrl}/${ApiUrlEnum.API}/${ApiUrlEnum.AUTH}/${ApiUrlEnum.SIGNUP}`;
        return this.http.post<any>(url,req);
    }

    /**
     * Logout the user
     */
    logout() {
        // remove user from local storage to log user out
        // sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null!);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.router.navigate(['/']).then(() => {
            location.reload();
        });
    }


    openSignInModal(signInType:string){
            const modalRef = this.modalService.open(SignInComponent, { size: 'xl', windowClass: 'modal-rounded', centered: true });
            modalRef.componentInstance.signInType = signInType;
            modalRef.result.then(() => {}, () => { });
    }
}
