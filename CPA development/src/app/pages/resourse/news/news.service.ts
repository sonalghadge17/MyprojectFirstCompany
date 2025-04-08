import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Path, subPath } from 'src/app/core/enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  Path = Path;
  constructor(private http: HttpClient) {}
  getallnewsBypegination(item: any) {
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
        Path.NEWS +
        "/" +
        subPath.GET_ALL,
      { params: httpParams }
    );
  }
  Save_News(requestDto: any) {
    return this.http.post(
      environment.apiUrl +"/"+
        Path.NEWS +
        "/" +
        subPath.SAVE,
      requestDto
    );
  }
News_By_Id(id: any) {
    return this.http.get(
      environment.apiUrl +
        "/" +
        Path.NEWS +
        "/" +
        subPath.GET+"/"+id,  
    );
  }
  Update_News(id: any, requestDto: any) {
    return this.http.put(
      environment.apiUrl +
        "/" +
        Path.NEWS +
        "/" +
        subPath.UPDATE +
        "/" +
        id,
      requestDto
    );
  }
  Delete_news(id:any){
    return this.http.delete(environment.apiUrl+"/"+Path.NEWS+"/"+subPath.DELETE+"/"+id)
  }
}
