import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Path, subPath } from 'src/app/core/enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {
  constructor(private http: HttpClient) {}
  getProfileById(id: any) {
 debugger
    return this.http.get(environment.apiUrl + "/" + Path.USERS + "/" +subPath.GET+"/"+ id);
  }
  updateAdmin(id: any, request: any) {
    debugger
    const httpParams = new HttpParams(); return this.http.put( environment.apiUrl +"/" +Path.USERS +"/" +
   subPath.UPDATE+ "/" +id, request,{ params: httpParams } );
  }
  changePassword(request: any) {
    debugger;
    return this.http.post(
      environment.apiUrl + "/" + Path.USERS + "/" + subPath.CHANGE_PASSWORD, request );
  }
}



