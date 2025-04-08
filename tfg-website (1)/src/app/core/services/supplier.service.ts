import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http:HttpClient) { }

  // save details 
  saveSupplierProfile(req:any){
    let url = `${environment.supplierApiUrl}/supplier-profile`;
    return this.http.post<any>(url,req);
  }
   // update details 
  //  updateSupplierProfile(req:any){
  //   let url = `${environment.supplierApiUrl}/supplier-profile`;
  //   return this.http.put<any>(url,req);
  // }

  // get by id 
  getSupplierDetailsById(id:string){
    let url = `${environment.supplierApiUrl}/supplier-profile/${id}`;
    return this.http.get<any>(url);
  }
  
}
