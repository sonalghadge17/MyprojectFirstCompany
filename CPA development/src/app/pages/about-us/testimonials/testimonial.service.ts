import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Path, subPath } from 'src/app/core/enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  Path = Path;
  constructor(private http: HttpClient) {}
  // getallTestimonialBypegination(item: any) {
  //   const httpParams = new HttpParams()
  //   .set("pageNo", item.pageNo)
  //     .set("pageSize", item.pageSize)
  //     .set("sortBy", item.sortBy)
  //     .set("sortOrder", item.sortOrder)
  //     .set("searchTerm", item.searchTerm)
  //     .set("isPagination", item.isPagination);
  //   return this.http.get(
  //     environment.apiUrl +
  //       "/" +
  //       Path.TESTIMONIALS +
  //       "/" +
  //       subPath.GET_ALL,
  //     { params: httpParams }
  //   );
  // }
  getallTestimonialBypegination() {
    return this.http.get(
      environment.apiUrl +"/"+
        Path.TESTIMONIALS +
        "/" +
        subPath.GET_ALL,
      
    );
  }
  Save_Testimonial(requestDto: any) {
    return this.http.post(
      environment.apiUrl +"/"+
        Path.TESTIMONIALS +
        "/" +
        subPath.SAVE,
      requestDto
    );
  }
  Testimonial_By_Id(id: any) {
    return this.http.get(
      environment.apiUrl +
        "/" +
        Path.TESTIMONIALS +
        "/" +
        subPath.GET+"/"+id,  
    );
  }
  Update_Testimonial(requestDto: any) {
    return this.http.put(
      environment.apiUrl +
        "/" +
        Path.TESTIMONIALS +
        "/" +
        subPath.UPDATE ,
      
      
      requestDto
    );
  }
  Delete_Testimonial(id:any){
    return this.http.delete(environment.apiUrl+"/"+Path.TESTIMONIALS+"/"+subPath.DELETE+"/"+id)
  }
}
