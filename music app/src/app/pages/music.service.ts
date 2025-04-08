import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { param } from 'jquery';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) { }
  getAllMusician(item: any) {
    debugger;
    // let item: any
    let httpParams = new HttpParams()
      .set("isPagination", item.isPagination)
      .set("pageNo", item.pageNo)
      .set("pageSize", item.pageSize)
      .set("sortBy", item.sortBy)
      .set("sortorder", item.sortorder)
      // if (item.supplierId) {
      //   httpParams = httpParams.set("supplierId", item.supplierId);
      //   }
      //   if (item.categoryId) {
      //     httpParams = httpParams.set("categoryId", item.categoryId);
      //     }
    
    let url = `${environment.apiUrl}/users/get-all`;
    return this.http.get<any[]>(url,{ params: httpParams });
    // return this.http.get<any[]>(url,{ params: httpParams });
  }
  getAllMusic(item: any) {
    debugger;
    // let item: any
    let httpParams = new HttpParams()
      .set("isPagination", item.isPagination)
      .set("pageNo", item.pageNo)
      .set("pageSize", item.pageSize)
      .set("sortBy", item.sortBy)
      .set("sortorder", item.sortorder)
      // if (item.supplierId) {
      //   httpParams = httpParams.set("supplierId", item.supplierId);
      //   }
      //   if (item.categoryId) {
      //     httpParams = httpParams.set("categoryId", item.categoryId);
      //     }
    
    let url = `${environment.apiUrl}/music_library/getAllMusic`;
    return this.http.get<any[]>(url,{ params: httpParams });
  }
  getAllFinance() {
    debugger;
    // let item: any
    // let httpParams = new HttpParams()
    //   .set("isPagination", item.isPagination)
    //   .set("pageNo", item.pageNo)
    //   .set("pageSize", item.pageSize)
    //   .set("sortBy", item.sortBy)
    //   .set("sortorder", item.sortorder)
      // if (item.supplierId) {
      //   httpParams = httpParams.set("supplierId", item.supplierId);
      //   }
      //   if (item.categoryId) {
      //     httpParams = httpParams.set("categoryId", item.categoryId);
      //     }
    
    let url = `${environment.apiUrl}/user_subscription/get-all-Finance`;
    return this.http.get<any[]>(url);
    // return this.http.get<any[]>(url,{ params: httpParams });
  }
  getAllContact(item: any) {
    debugger;
    // item: any
    let httpParams = new HttpParams()
      .set("isPagination", item.isPagination)
      .set("pageNo", item.pageNo)
      .set("pageSize", item.pageSize)
      .set("sortBy", item.sortBy)
      .set("sortorder", item.sortorder)
      // if (item.supplierId) {
      //   httpParams = httpParams.set("supplierId", item.supplierId);
      //   }
      //   if (item.categoryId) {
      //     httpParams = httpParams.set("categoryId", item.categoryId);
      //     }
    
    let url = `${environment.apiUrl}/contact_querie/get-all`;
    return this.http.get<any[]>(url,{ params: httpParams });
  }


  approvedStatus(id: any,status: any) {
    let httpParams = new HttpParams()
    .set("status", status)
    let url = `${environment.apiUrl}/music_library/music-status-change/${id}`;
    // let url = `${environment.apiUrl}/music_library/music-status-change/${id}?status=`;
    return this.http.put(url,{},{params: httpParams});
  }
  
  approvedStatusMusician(id: any) {
    let url = `${environment.apiUrl}/users/user-status-change/${id}`;
    return this.http.put(url,{});
  }
}
