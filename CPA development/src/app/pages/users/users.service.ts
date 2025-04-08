import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { subPath,Path } from 'src/app/core/enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  Path = Path;
  constructor(private http: HttpClient) {}
  getallUserBypegination(item: any,) {
    const httpParams = new HttpParams()
    .set("pageNo", item.pageNo)
    .set("pageSize",item.pageSize)
    .set("orderBy", item.orderBy)
    .set("sortBy", item.sortBy)
    .set("isPagination", item.isPagination)
    .set("status", item.status)
    .set("role",item.role)
    .set("searchTerm", item.searchTerm);
    return this.http.get(
      environment.apiUrl +
        "/" +
        Path.USERS +
        "/" +
        subPath.GET_ALL,
      { params: httpParams }
    );
  }
 
  Save_User(requestDto: any) {
    return this.http.post(
      environment.apiUrl +"/"+
        Path.USERS +
        "/" +
       'save-subadmin',
      requestDto
    );
  }
 userGet_ById(id: any) {
    return this.http.get(
      environment.apiUrl +
        "/" +
        Path.USERS +
        "/" +
        subPath.GET+"/"+id,  
    );
  }
  Update_User(id: any, requestDto: any) {
    return this.http.put(
      environment.apiUrl +
        "/" +
        Path.USERS +
        "/" +
        'update-subadmin' +
        "/" +
        id,
      requestDto
    );
  }
  Delete_User(id:any){
    return this.http.delete(environment.apiUrl+"/"+Path.USERS+"/"+subPath.DELETE+"/"+id)
  }
  Block_User(id: any) {
    return this.http.put(
      `${environment.apiUrl}/${Path.USERS}/${subPath.BLOCK_UNBLOCK_USER}/${id}`,
      {}
    );
  }

}
