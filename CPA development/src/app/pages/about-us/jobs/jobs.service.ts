import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Path, subPath } from 'src/app/core/enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
Path = Path;
  constructor(private http: HttpClient) {}
  getall_Jobs_Bypegination(item: any) {
    const httpParams = new HttpParams()
    .set("pageNo", item.pageNo)
      .set("pageSize", item.pageSize)
      .set("sortBy", item.sortBy)
      .set("sortOrder", item.sortOrder)
      .set("searchTerm", item.searchTerm)
      .set("isPagination", item.isPagination);
    return this.http.get(
      environment.apiUrl +
        "/" +
        Path.JOBS +
        "/" +
        subPath.GET_ALL,
      { params: httpParams }
    );
  }
  Save_Jobs(requestDto: any) {
    return this.http.post(
      environment.apiUrl +"/"+
        Path.JOBS +
        "/" +
        subPath.SAVE,
      requestDto
    );
  }
Jobs_By_Id(id: any) {
    return this.http.get(
      environment.apiUrl +
        "/" +
        Path.JOBS +
        "/" +
        subPath.GET+"/"+id,  
    );
  }
  Update_Jobs(id: any, requestDto: any) {
    return this.http.put(
      environment.apiUrl +
        "/" +
        Path.JOBS +
        "/" +
        subPath.UPDATE +
        "/" +
        id,
      requestDto
    );
  }
  Delete_Jobs(id:any){
    return this.http.delete(environment.apiUrl+"/"+Path.JOBS+"/"+subPath.DELETE+"/"+id)
  }
  updateJobStatus(usersId: number, status: string) {
    const httpParams = new HttpParams().set('status', status);
    return this.http.put(
      `${environment.apiUrl}/job/change-status/${usersId}`,{},
      { params: httpParams } // Use the params object to set the query string
    );
  }
}

