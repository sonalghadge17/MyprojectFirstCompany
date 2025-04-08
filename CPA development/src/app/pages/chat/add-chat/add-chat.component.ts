import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { ChatService } from '../chat.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Lightbox } from 'ngx-lightbox';
import { DatePipe } from '@angular/common';
import { ChatMessage, ChatUser, ContactModel, GroupUser } from '../../apps/chat/chat.model';
import { groupData, chatData, chatMessagesData, contactData } from './data';
import { interval, Subscription } from 'rxjs';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';

@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrl: './add-chat.component.scss'
})
export class AddChatComponent implements OnInit {
  searchText :any;
  searchMsgText:any;
  chatData!: ChatUser[];
  groupData!: GroupUser[];
  chatMessagesData!: ChatMessage[];
  contactData!: ContactModel[];
  formData!: UntypedFormGroup;
  usermessage!: string;
  itemsPerPage = 10;
  editingMessageId: number | null = null; // Track the id of the message being edited
  editedMessage: string = ''; // Store the edited message
  pageNo = 1;
  search = "";
  isFlag: boolean = false;
  submitted = false;
  isStatus: string = 'online';
  isProfile: string = 'assets/images/users/avatar-2.jpg';
  username: any = 'Lisa Parker';
  @ViewChild('scrollRef') scrollRef:any;
  images: { src: string; thumb: string; caption: string }[] = [];
  isreplyMessage = false;
  emoji = '';
  UserList: any;
  userName: any;
  chatId: any;
  chatList: any;
  userId: any;
  currentUser: any;
  formData1!: FormData;
  chatSubscription!: Subscription;
  refreshChatSubscription: any;

  constructor(public formBuilder: UntypedFormBuilder, private lightbox: Lightbox, private datePipe: DatePipe, private offcanvasService: NgbOffcanvas,
    private spinner: NgxSpinnerService, private modalService: NgbModal, private authfakeauthenticationService: AuthfakeauthenticationService,
    private chatService: ChatService,
    private toastr: ToastrService) { 
    for (let i = 1; i <= 24; i++) {
      const src = '../../../../assets/images/small/img-' + i + '.jpg';
      const caption = 'Image ' + i + ' caption here';
      const thumb = '../../../../assets/images/small/img-' + i + '-thumb.jpg';
      const item = {
        src: src,
        caption: caption,
        thumb: thumb
      };
      this.images.push(item);
    }
  }

  ngOnInit(): void {
    const currentUser = this.authfakeauthenticationService.currentUserValue;
    this.currentUser = currentUser;
    // Chat Data Get Function
    this._fetchData();

    // Validation
    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
    // Chat Data Get Function
    this._fetchData();
    
    this.getallUser();
    
    this.onListScroll();
    debugger
  
// this.getAllChat()
   
    this.refreshChatSubscription = interval(5000).subscribe(() => {
     
      this.getAllChat();
      
    });
  
  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    if (this.refreshChatSubscription) {
      this.refreshChatSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = 300;
    this.onListScroll();
  }

  // Chat Data Fetch
  private _fetchData() {
    this.groupData = groupData;
    this.chatData = chatData;
    this.chatMessagesData = chatMessagesData;
    this.contactData = contactData;    
  }
  getallUser() {
    debugger
    this.spinner.show();
    let requestBody = {
      isPagination: 0,
      pageNo: this.pageNo - 1,
      pageSize: this.itemsPerPage,
      orderBy: "DESC",
      sortBy: "lastModifiedDate",
      searchTerm: this.search,
    };
    const sbGetAll = this.chatService
      .getallChatBypegination(requestBody)
      .subscribe(
        (res: any) => {
          debugger
          this.spinner.hide();
          if (res.success) {
            this.UserList = res.data;
            this.userName = this.UserList[0].userName
            this.chatId = this.UserList[0].chatId
            this.userId = this.UserList[0].usersId
            // this.getAllChat()
            // this.listLength = res.data.totalElements;
          } else {
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error(error);
        }
      );
    // this.subscriptions.push(sbGetAll);
  }


  getAllChat(){
    debugger
    this.chatService.getAll_UsersChat(this.chatId).subscribe((res:any)=>{
      if(res.success){
        this.chatList = res.data
        
      }
    })
  }
  /**
   * 
   * 
   * Returns form
   */
   get form() {
    return this.formData.controls;
  }

  onListScroll() {
    console.log('vghnbhj', this.scrollRef)
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop = this.scrollRef.SimpleBar.getScrollElement().scrollHeight;
      }, 6000);
    }
    // this.getAllChat()
  }
  prepareData(){
    debugger
    let obj = {
      // id:this.formGroup.get('id')?.value,
      message:this.formData.get('message')?.value,
      usersId:this.currentUser.id,
      chatId:this.chatId
    }
    this.formData1 = new FormData();
    this.formData1.append('usersChatRequest',JSON.stringify(obj));
    // this.files.map((item: any) => {
    //   this.formData.append('documents', item);
    // })
  }
  sendMessage(){
    debugger
    if (this.formData.invalid) {
      this.toastr.error('Message cannot be empty.');
      return;
    }
    this.prepareData()

    this.chatService.SaveChat(this.formData1).subscribe((res:any)=>{
      if(res.success){
        // this.toastr.success(res.message);
        this.spinner.hide();
        this.getAllChat()
        this.onListScroll()
      }else{
        this.toastr.error(res.message)
      }
    })

    this.formData.reset();
  }
  /**
   * Save the message in chat
   */
  editMessage(messageId: number, currentMessage: string) {
    this.editingMessageId = messageId;
    this.editedMessage = currentMessage;  // Set the current message in the input field
  }
  cancelEdit(): void {
    this.editingMessageId = null;
    this.editedMessage = ''; // Clear the message input
  }

  // Function to save the edited message
  saveEditedMessage(messageId: number,data:any) {
    debugger
    console.log(messageId)
    console.log(data)
    if (this.editedMessage.trim() !== '') {
      const message = this.chatList.find((item: { id: number; }) => item.id === messageId);
      if (message) {
        message.message = this.editedMessage; 
        let obj={
          message:message.message,
          usersChatId:messageId
        }
        this.chatService.updateSingleMessage(obj).subscribe((res: any) => {
          if (res.success) {
            this.toastr.success(res.message);
            // this.chatList = [];
            // this.getallDocument();
          } else {
          }
        });
        // console.log(message.message) // Update the message content in the chat list
      }
    }
    this.editingMessageId = null;  // Close the editing input field
    this.editedMessage = '';  // Clear the input field
  }




  clearChat() {
    // Clear the chat messages from the list
this. deleteChat() 
    
}
   deleteChat() {
      debugger;
      const modalRef = this.modalService.open(DeleteModalComponent, {
        size: "sm",
        centered: true,
      });
      modalRef.componentInstance.id = this.chatId;
      modalRef.componentInstance.type = 'chat';
      modalRef.result.then(
        () => {
          this.deleteChatUser(this.chatId);
        },
        () => {}
      );
    }
    deleteChatUser(id: number) {
      debugger;
      this.chatService.DeleteChat(id).subscribe((res: any) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.chatList = [];
          // this.getallDocument();
        } else {
        }
      });
    }
  // Function to delete a message
  // deleteMessage(messageId: number) {
  //   this.chatList = this.chatList.filter(item => item.id !== messageId);
  // }

  /***
  * OnClick User Chat show
  */
  chatUsername(name: string, chatId: any, userId: string) {
    debugger
    this.isFlag = true;
    this.userName = name;
    this.chatId = chatId

    if(chatId){
      this.getAllChat()
      this.onListScroll()
    }
    this.userId = userId
    const currentDate = new Date();
    this.isStatus = status;
    this.isProfile =  'assets/images/users/user-dummy-img.jpg';
    this.chatMessagesData.map((chat) => { if (chat.profile) { chat.profile = this.isProfile } });
    const userChatShow = document.querySelector('.user-chat');
    if(userChatShow != null){
      userChatShow.classList.add('user-chat-show');
    }
  }

  open(index: number): void {
    // open lightbox
    this.lightbox.open(this.images, index, { });
  }

  close(): void {
    // close lightbox programmatically
    this.lightbox.close();
  }

 // Copy Message
 copyMessage(event:any){
  navigator.clipboard.writeText(event.target.closest('.chat-list').querySelector('.ctext-content').innerHTML);
  (document.getElementById("copyClipBoard") as HTMLElement).style.display = "block";
  setTimeout(() => {
  (document.getElementById("copyClipBoard") as HTMLElement).style.display = "none";
  }, 1000);
}

  // Delete Message
  deleteMessage(event:any,data:any){
 
    let obj={
      usersId:data.usersId,
      usersChatIds:[
data.id
      ]
    }
    this.chatService.DeleteSingleMessage(obj).subscribe((res: any) => {
      if (res.success) {
        this.toastr.success(res.message);
        event.target.closest('.chat-list').remove();
        // this.getallDocument();
      } else {
      }
    });
    console.log(obj)
    
  }
 
  // Replay Message
  replyMessage(event:any,align:any){
    this.isreplyMessage = true;
    document.querySelector('.replyCard')?.classList.add('show');
    var copyText = event.target.closest('.chat-list').querySelector('.ctext-content').innerHTML;
    (document.querySelector(".replyCard .replymessage-block .flex-grow-1 .mb-0") as HTMLAreaElement).innerHTML = copyText;
    var msgOwnerName:any = event.target.closest(".chat-list").classList.contains("right") == true ? 'You' : document.querySelector('.username')?.innerHTML;
    (document.querySelector(".replyCard .replymessage-block .flex-grow-1 .conversation-name") as HTMLAreaElement).innerHTML = msgOwnerName;
  }

  closeReplay(){
    document.querySelector('.replyCard')?.classList.remove('show');
  }

  // Delete All Message
  deleteAllMessage(event:any){
    var allMsgDelete:any = document.getElementById('users-conversation')?.querySelectorAll('.chat-list');
    allMsgDelete.forEach((item:any)=>{
      item.remove();
    })
  }
  

  // Contact Search
  ContactSearch(){
    var input:any, filter:any, ul:any, li:any, a:any | undefined, i:any, txtValue:any;
    input = document.getElementById("searchContact") as HTMLAreaElement;
    filter = input.value.toUpperCase();
    ul = document.querySelectorAll(".chat-user-list");
    ul.forEach((item:any)=>{
      li = item.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("p")[0];
        txtValue = a?.innerText;
        if (txtValue?.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
      }
    })
    
  }

  // Message Search
  MessageSearch(){
    var input:any, filter:any, ul:any, li:any, a:any | undefined, i:any, txtValue:any;
    input = document.getElementById("searchMessage") as HTMLAreaElement;
    filter = input.value.toUpperCase();
    ul = document.getElementById("users-conversation");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("p")[0];
      txtValue = a?.innerText;
      if (txtValue?.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
    } else {
        li[i].style.display = "none";
    }
    }
  }

  //  Filter Offcanvas Set
  openEnd(content: TemplateRef<any>) {    
    this.offcanvasService.open(content, { position: 'end' });
  }


  // Emoji Picker
  showEmojiPicker = false;
  sets:any = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set:any = 'twitter';
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event:any) {
    const { emoji } = this;
    const text = `${emoji}${event.emoji.native}`;
    this.emoji = text;
    this.showEmojiPicker = false;
  }

  onFocus() {
    this.showEmojiPicker = false;
  }
  onBlur() {
  }

  /**
   * Delete Chat Contact Data 
   */
  delete(event:any) {
    event.target.closest('li')?.remove();
  }

  hideChat(){
    const userChatShow = document.querySelector('.user-chat');
    if(userChatShow != null){
      userChatShow.classList.remove('user-chat-show');
    }
  }

}
