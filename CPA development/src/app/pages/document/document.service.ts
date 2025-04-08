import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Path, subPath } from 'src/app/core/enum';
import { environment } from 'src/environments/environment';
import * as FileSaver from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  Path = Path;
  constructor(private http: HttpClient) {}
  getallDocumentBy_Pagination(item: any,) {
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
    .set("date",item.date)
    return this.http.get(
      environment.apiUrl +
        "/" +
        Path.DOCUMENTS +
        "/" +
        subPath.GET_ALL_DOCUMENTS_LIST_WITH_FILTER,
      { params: httpParams }
    );
  }

  getallRecievedDocumentBy_Pagination(item: any,) {
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
    .set("date",item.date)
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
  Save_Document(postData: any,documentRequest:any) {
    debugger
    const httpParams = new HttpParams()
      .set('documentRequest', documentRequest)
      // .set('documents', postData.documents)
    
        let url = `${environment.apiUrl}/${Path.DOCUMENTS}/${subPath.SAVE_DOCUMENTS}`
        return this.http.post<any>(url, postData ,{ params: httpParams })
      }

  GetByID_Document(id: any) {
    return this.http.get(
      environment.apiUrl + "/" + Path.DOCUMENTS + "/" + id
    );
  }
  
  Update_Document(id: any, postData: any) {
    const url = `${environment.apiUrl}/${Path.DOCUMENTS}/${subPath.UPDATE_DOCUMENT}/${id}`;
    return this.http.put<any>(url, postData);
  }
  
  downloadDocument(id: any) {
    debugger;
    return this.http.get(environment.apiUrl + "/" + Path.DOCUMENTS + "/" + subPath.DOWNLOAD + "/" + id, 
    { observe: "response", responseType: "blob" as "json" }).subscribe(
      (response: { body: any }) => {
        // Use FileSaver to save the blob as a file
        FileSaver.saveAs(response.body);
      },
      (err) => {
        console.error('Error downloading the document', err);
      }
    );
  }
  
  Delete_Document(id:any){
    debugger
    return this.http.delete(environment.apiUrl+"/"+Path.DOCUMENTS+"/"+id)
  }
  // Delete_DocumentFile(fileIds:any){
  //   debugger
  //   return this.http.delete(environment.apiUrl+"/"+Path.DOCUMENTS+"/"+"deletes"+"/"+id)
  // }
  Delete_DocumentFile(fileIds: any[]) {
  debugger // Create the request body with the file IDs
    return this.http.request('delete', `${environment.apiUrl}/${Path.DOCUMENTS}/deletes`,{
      body: fileIds, // Pass the array directly in the body
    });
  }
  DownloadZip(id: any) {
    const url = `${environment.apiUrl}/${Path.DOCUMENTS}/download-group-of-document-zip/${id}`;
  
    this.http.get(url, { 
        observe: 'response', 
        responseType: 'blob' // Ensure responseType is blob
      })
      .subscribe((response) => {
        if (response.body) { // Check if response.body is not null
          // Extract filename from response headers if available
          const contentDisposition = response.headers.get('content-disposition');
          let fileName = 'document.zip'; // Default filename
  
          if (contentDisposition) {
            const matches = /filename="([^"]*)"/.exec(contentDisposition);
            if (matches != null && matches[1]) {
              fileName = matches[1];
            }
          }
  
          // Save the file
          FileSaver.saveAs(response.body, fileName);
        } else {
          console.error('The file could not be downloaded as the response body is null.');
        }
      },
      (error) => {
        console.error('Error downloading the file:', error);
      }); 
  }
}