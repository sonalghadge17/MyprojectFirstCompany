import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { AddChatComponent } from './add-chat/add-chat.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { PickerModule } from '@ctrl/ngx-emoji-mart';


@NgModule({
  declarations: [
    ChatComponent,
    AddChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule, FormsModule, SimplebarAngularModule,ReactiveFormsModule,NgxPaginationModule,
    NgbNavModule,FeatherModule.pick(allIcons),PickerModule,NgbModule
    
  ]
})
export class ChatModule { }
