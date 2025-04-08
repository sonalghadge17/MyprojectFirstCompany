import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyKindOfDictionary } from 'lodash';
import { Path, subPath } from 'src/app/core/enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
 Path = Path;
  constructor(private http: HttpClient) {}
  getallChatBypegination(item: any,) {
    const httpParams = new HttpParams()
    .set("pageNo", item.pageNo)
    .set("pageSize",item.pageSize)
    .set("orderBy", item.orderBy)
    .set("sortBy", item.sortBy)
    .set("isPagination", item.isPagination)
    .set("searchTerm",item.searchTerm)
    return this.http.get(
      environment.apiUrl +
        "/" +
        Path.USERS_CHAT +
        "/" +
        subPath.GET_ALL_CHATS,
      { params: httpParams }
    );
  }
  getAll_UsersChat(chatId: string) {
    debugger;
    const httpParams = new HttpParams().set("chatId", chatId); 
    return this.http.get(
      `${environment.apiUrl}/${Path.USERS_CHAT}/${subPath.GET_ALL_USERS_CHAT}`,
      { params: httpParams }
    );
  }
  getAllChatByUserId(item: any,) {
    debugger
    const httpParams = new HttpParams()
    .set("usersId", item.usersId )
    return this.http.get(
      environment.apiUrl +
        "/" +
        Path.USERS_CHAT +
        "/" +
        subPath.GET_ALL_CHAT_BY_USERID,
      { params: httpParams }
    );
  }
 
  SaveChat(requestDto: any) {
    return this.http.post(
      environment.apiUrl +"/"+
        Path.USERS_CHAT +
        "/" +
        subPath.SAVE_ADMINS_CHAT,
      requestDto
    );
  }
 
  Delete_User(id:any){
    return this.http.delete(environment.apiUrl+"/"+Path.USERS+"/"+subPath.DELETE+"/"+id)
  }
  Block_User(id: any) {
    return this.http.put(
      `${environment.apiUrl}/${Path.USERS}/${subPath.BLOCK_UNBLOCK_USER}/${id}`,
      {}
    );
  }
  DeleteChat(chatId :any){
    debugger
    const httpParams = new HttpParams()
    .set("chatId",chatId  )
    return this.http.delete(environment.apiUrl+"/"+`users-chat/delete-all-users-chat-by-chat-id`,{ params: httpParams })
  }
  DeleteSingleMessage(obj :any){
    debugger
    const options = {
      body: obj,  // Include the object as the body of the DELETE request
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
   
    return this.http.delete(environment.apiUrl+"/"+`users-chat/delete-userschat-by-usersId`, options)
  }
  updateSingleMessage(obj: any) {
    let url = `${environment.apiUrl}/users-chat/update-chat`;
  
    return this.http.put<any>(url, obj);
  }
}
