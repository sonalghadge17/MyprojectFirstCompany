import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Path, subPath } from 'src/app/core/enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
 Path = Path;
  constructor(private http: HttpClient) {}
  getallAccountBy_Pagination(item: any,) {
    const httpParams = new HttpParams()
    .set("pageNo", item.pageNo)
    .set("pageSize",item.pageSize)
    .set("sortOrder", item.sortOrder)
    .set("sortBy", item.sortBy)
    .set("searchTerm", item.searchTerm)
    .set("status", item.status)
    .set("isPagination", item.isPagination)
    .set("userId",item.userId)
    .set("type",item.type)
    .set("documentType",item.documentType)
    return this.http.get(
      environment.apiUrl +
        "/" +
        Path.DOCUMENTS +
        "/" +
        subPath.GET_ALL_DOCUMENTS_LIST_WITH_FILTER,
      { params: httpParams }
    );
  }
  getallRecievedAccountBy_Pagination(item: any,) {
    const httpParams = new HttpParams()
    .set("pageNo", item.pageNo1)
    .set("pageSize",item.pageSize)
    .set("sortOrder", item.sortOrder)
    .set("sortBy", item.sortBy)
    .set("searchTerm", item.searchTerm)
    .set("status", item.status)
    .set("isPagination", item.isPagination)
    .set("userId",item.userId)
    .set("type",item.type)
    .set("documentType",item.documentType)
    return this.http.get(
      environment.apiUrl +
        "/" +
        Path.DOCUMENTS +
        "/" +
        subPath.GET_ALL_DOCUMENTS_LIST,
      { params: httpParams }
    );
  }
  getallUser(item: any,) {
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
  Save_Account(postData: any,documentRequest:any) {
    debugger
    const httpParams = new HttpParams()
      .set('documentRequest', documentRequest)
      // .set('documents', postData.documents)
    
        let url = `${environment.apiUrl}/${Path.DOCUMENTS}/${subPath.SAVE_DOCUMENTS}`
        return this.http.post<any>(url, postData ,{ params: httpParams })
      }

  GetByID_Account(id: any) {
    return this.http.get(
      environment.apiUrl + "/" + Path.DOCUMENTS + "/" + id
    );
  }
  Update_Document(id: any, postData: any) {
    const url = `${environment.apiUrl}/${Path.DOCUMENTS}/${subPath.UPDATE_DOCUMENT}/${id}`;
    return this.http.put<any>(url, postData);
  }
  downloadAccount(id: any, key: any) {
    debugger;
    return this.http.get(environment.apiUrl + "/" + Path.DOCUMENTS + "/" + subPath.DOWNLOAD + "/" + id, 
    { observe: "response", responseType: "blob" as "json" }).subscribe(
      (response: { body: any }) => {
        // Use FileSaver to save the blob as a file
        FileSaver.saveAs(response.body, key);
      },
      (err) => {
        console.error('Error downloading the document', err);
      }
    );
  }
  Delete_Document(id:any){
    return this.http.delete(environment.apiUrl+"/"+Path.DOCUMENTS+"/"+id)
  }

  downloadZip(documentId: string) {
    const apiUrl = `/documents/download-group-of-document-zip/${documentId}`;
    return this.http.get(apiUrl, { responseType: 'blob' });
  }
}
