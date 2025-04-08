import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Path, subPath } from 'src/app/core/enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {
  Path = Path;
  constructor(private http: HttpClient) {}
  getallFaqsBypegination(item: any) {
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
        Path.FAQS +
        "/" +
        subPath.GET_ALL,
      { params: httpParams }
    );
  }
  Save_Faqs(requestDto: any) {
    return this.http.post(
      environment.apiUrl +"/"+
        Path.FAQS +
        "/" +
        subPath.SAVE,
      requestDto
    );
  }
  Faqs_By_Id(id: any) {
    return this.http.get(
      environment.apiUrl +
        "/" +
        Path.FAQS +
        "/" +
        subPath.GET+"/"+id,  
    );
  }
  Update_Faqs(id: any, requestDto: any) {
    return this.http.put(
      environment.apiUrl +
        "/" +
        Path.FAQS +
        "/" +
        subPath.UPDATE +
        "/" +
        id,
      requestDto
    );
  }
  Delete_Faqs(id:any){
    return this.http.delete(environment.apiUrl+"/"+Path.FAQS+"/"+subPath.DELETE+"/"+id)
  }
}
