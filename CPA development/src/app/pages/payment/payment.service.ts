import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Path, subPath } from 'src/app/core/enum';
import { environment } from 'src/environments/environment';
import * as FileSaver from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
Path = Path;
  constructor(private http: HttpClient) {}

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
  getallPaymentBy_Pagination(item: any,) {
    const httpParams = new HttpParams()
    .set("pageNo", item.pageNo)
    .set("pageSize",item.pageSize)
    .set("orderBy", item.orderBy)
    .set("sortBy", item.sortBy)
    .set("searchTerm", item.searchTerm)
    .set("isPagination", item.isPagination)
    return this.http.get(
      environment.apiUrl +
        "/" +
        Path.PAYMENT +
        "/" +
        subPath.GET_ALL_PAYMENT_DATA,
      { params: httpParams }
    );
  }
  Save_Payment(iqacmeetingDto: any) {
    debugger
    return this.http.post(environment.apiUrl + "/" + Path.PAYMENT + "/" + subPath.SAV_PAYMENT,iqacmeetingDto);
  }
  Payment_Show_By_Id(id: any) {
    return this.http.get(
      environment.apiUrl +
        "/" +
      `payment/get-payment-by-id`+
        "/" 
        +
        id
    );
  }
  PaymentById(id: any) {
    return this.http.get(
      environment.apiUrl +
        "/" +
      `payment/get-payment-by-payment-id`+
        "/" 
        +
        id
    );
  }
  updatePayment(iqacmeetingDto: any,payId:any) {
  let url = `${environment.apiUrl}`+`/payment/update-payment/${payId}`;
  // console.log('Update IQAC Meeting URL:', url); // Logging the URL
  return this.http.put<any>(url, iqacmeetingDto);
}
  deletePayment(id: any) {
    return this.http.delete(
      `${environment.apiUrl}/payment/delete-payment?id=${id}`
       
    );
  }

  // downloadDocument(id: any) {
  //     debugger;
  //     return this.http.get(environment.apiUrl + "/" + Path.PAYMENT + "/" + "get-invoice-pdf-download" + "/" + id, 
  //     { observe: "response", responseType: "blob" as "json" }).subscribe(
  //       (response: { body: any }) => {
  //         // Use FileSaver to save the blob as a file
  //         FileSaver.saveAs(response.body);
  //       },
  //       (err) => {
  //         console.error('Error downloading the document', err);
  //       }
  //     );
  //   }
    downloadDocument(id: any,milestoneName:any) {
      debugger;
      const url = `${environment.apiUrl}/${Path.PAYMENT}/${subPath.INVOICE_DOWNLOAD}/${id}`;
      
      this.http.get(url, { observe: 'response', responseType: 'blob' as 'json' })
        .subscribe((response: { body: any}) => {
          debugger
          const blob = new Blob([response.body!], { type: 'application/pdf' });
          // const fileName = `Invoice_${id}.pdf`; // Dynamic file name if needed
          const fileName = `Invoice_${milestoneName}.pdf`; // Dynamic file name if needed
    
          FileSaver.saveAs(blob, fileName); // Save the file
        }, (err) => {
          console.error('Error downloading the file', err);
        });
    }
}

