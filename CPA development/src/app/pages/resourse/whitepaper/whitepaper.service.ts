import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Path, subPath } from 'src/app/core/enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WhitepaperService {
Path = Path;
  constructor(private http: HttpClient) {}
  getall_WhitepaperBypegination(item: any) {
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
        Path.WHITE_PAPER +
        "/" +
        subPath.GET_ALL,
      { params: httpParams }
    );
  }
  Save_White_Paper(requestDto: any) {
    return this.http.post(
      environment.apiUrl +"/"+
        Path.WHITE_PAPER +
        "/" +
        subPath.SAVE_WHITE_PAPER,
      requestDto
    );
  }
  WhitePaper_By_Id(id: any) {
    return this.http.get(
      environment.apiUrl +
        "/" +
        Path.WHITE_PAPER +
        "/" +
        subPath.GET+"/"+id,  
    );
  }
  Update_White_Paper(requestDto: any) {
    return this.http.put(
      environment.apiUrl +
        "/" +
        Path.WHITE_PAPER +
        "/" +
        subPath.UPDATE_WHITE_PAPER,
      requestDto
    );
  }
  Delete_WhitePaper(id:any){
    return this.http.delete(environment.apiUrl+"/"+Path.WHITE_PAPER+"/"+subPath.DELETE+"/"+id)
  }
}
