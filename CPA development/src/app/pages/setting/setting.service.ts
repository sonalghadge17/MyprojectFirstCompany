import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Path, subPath } from 'src/app/core/enum';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SettingService {
  constructor(private http: HttpClient) {}
  //Termsandconditions
  getAllTerms_Conditions(){
    debugger
    return this.http.get(environment.apiUrl+"/"+Path.TERMS_CONDITION+"/"+subPath.GET_ALL)
  }
  Savetermsandcondition(termAndConditionsDto:any){
    debugger
    return this.http.post(environment.apiUrl+"/"+Path.TERMS_CONDITION+"/"+subPath.SAVE_UPDATE_TERMS_CONDITIONS,termAndConditionsDto)
  }
 //privacypolicy
 getAllPrivacyPolicy(){
  return this.http.get(environment.apiUrl+"/"+Path.PRIVACY_POLICY+"/"+subPath.GET_ALL)
}
Saveprivacy_policy(privacyPolicyDto :any){
  debugger
  return this.http.post(environment.apiUrl+"/"+Path.PRIVACY_POLICY+"/"+subPath.SAVE_UPDATE_PRIVACY_POLICY,privacyPolicyDto)
}
//ContactUs
GetAllContactUsByPagination(item: any) {
  const httpParams = new HttpParams()
  .set("pageNo", item.pageNo)
    .set("pageSize", item.pageSize)
    .set("sortOrder", item.sortOrder)
    .set("sortBy", item.sortBy)
    .set("searchTerm", item.searchTerm)
    .set("isPagination", item.isPagination)
    .set("fromDate", item.fromDate)
    .set("toDate", item.toDate)
  return this.http.get(
    environment.apiUrl +
      "/" +
      Path.CONTACT_US_USER_INFO +
      "/" +
      subPath.GET_ALL,
    { params: httpParams }
  );
}
}