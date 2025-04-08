import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Path, subPath } from 'src/app/core/enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BolgService {
 Path = Path;
  constructor(private http: HttpClient) {}
  getallBlogBypegination(item: any) {
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
        Path.BLOG +
        "/" +
        subPath.GET_ALL,
      { params: httpParams }
    );
  }
  Save_Blog(requestDto: any) {
    return this.http.post(
      environment.apiUrl +"/"+
        Path.BLOG +
        "/" +
        subPath.SAVE_BLOG,
      requestDto
    );
  }
  Blog_By_Id(id: any) {
    return this.http.get(
      environment.apiUrl +
        "/" +
        Path.BLOG +
        "/" +
        subPath.GET+"/"+id,  
    );
  }
  Update_Blog(requestDto: any) {
    return this.http.put(
      environment.apiUrl +
        "/" +
        Path.BLOG +
        "/" +
        subPath.UPDATE_BLOG ,
      requestDto
    );
  }
  Delete_Blog(id:any){
    return this.http.delete(environment.apiUrl+"/"+Path.BLOG+"/"+subPath.DELETE+"/"+id)
  }
}
