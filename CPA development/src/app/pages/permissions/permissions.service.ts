import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  
  constructor(private http: HttpClient) {}
  getallModule() {
   
    return this.http.get(
      environment.apiUrl +
       
       '/modules/get-all',
    
    );
  }
 
  Save_Permissions(requestDto: any) {
    return this.http.post(
      environment.apiUrl +
       '/permission/assign-permissions-to-user-save',
      requestDto
    );
  }
 userPermissionGet_ById(id: any) {
     return this.http.get(
       environment.apiUrl +
       '/permission/user/'+id,  
     );
   }
   updatePermissions(requestDto: any) {
    return this.http.put(
      environment.apiUrl +
       '/permission/update',
      requestDto
    );
  }
 

}
