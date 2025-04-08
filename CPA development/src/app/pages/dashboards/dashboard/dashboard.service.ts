import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Path, subPath } from 'src/app/core/enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public Path = Path;
  constructor(private http: HttpClient) { }
  getAll(){
    debugger
    return this.http.get(environment.apiUrl+"/"+Path.DASHBOARD+"/"+subPath.GET_ALL_COUNT)
  }
}
