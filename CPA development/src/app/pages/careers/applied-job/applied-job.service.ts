import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Path } from 'src/app/core/enum';
import { environment } from 'src/environments/environment';
import * as FileSaver from "file-saver";


@Injectable({
  providedIn: 'root'
})
export class AppliedJobService{
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
      environment.apiUrl + "/" +`job-apply/get-all`+"/",{ params: httpParams }
    );
  }
 downloadResume(id: any) {
   
    return this.http.get(environment.apiUrl + "/" +`job-apply/download/`+ id, 
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
  
// downloadResume(id: any) {
//   debugger
//   this.http.get(`${environment.apiUrl}/job-apply/download/${id}`, {
//     observe: "response",
//     responseType: "blob"
//   }).subscribe(
//     (response) => {
//       debugger
//       const contentDisposition = response.headers.get('content-disposition');
//       let filename = 'resume.pdf'; // Default filename

//       // Extract the filename from Content-Disposition
//       if (contentDisposition) {
//         const filenameMatch = contentDisposition.match(/filename="(.+)"/);
//         if (filenameMatch && filenameMatch[1]) {
//           filename = filenameMatch[1]; // Extracted filename
//         }
//       }

//       console.log('Downloaded filename:', filename); // Log the filename

//       // Save the file
//       if(response.body){
//         const blob = new Blob([response.body], { type: response.headers.get('Content-Type') || 'application/octet-stream' });
//         FileSaver.saveAs(blob, filename);

//       }
   
//     },
//     (err) => {
//       console.error('Error downloading the document', err);
//     }
//   );
// }
}
