import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Path, subPath } from 'src/app/core/enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  Path = Path;
  constructor(private http: HttpClient) {}
  Get_Msodules(item: any,) {
    const httpParams = new HttpParams()
    .set("pageNo", item.pageNo)
    .set("pageSize",item.pageSize)
    .set("orderBy", item.orderBy)
    .set("sortBy", item.sortBy)
    .set("isPagination", item.isPagination)
    .set("status", item.status)
    .set("role",item.role)
    .set("isPagination", item.isPagination);
    return this.http.get(
      environment.apiUrl +
        "/" +
        Path.USERS +
        "/" +
        subPath.GET_ALL,
      { params: httpParams }
    );
  }
 
  Get_Modules() {
    return this.http.get(
      environment.apiUrl +"/"+
        Path.MODULES +
        "/" +
        subPath.MODULE_ENDPOINT,
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
        subPath.UPDATE +
        "/" +
        id,
      requestDto
    );
  }
  Delete_User(id:any){
    return this.http.delete(environment.apiUrl+"/"+Path.USERS+"/"+subPath.DELETE+"/"+id)
  }
}
