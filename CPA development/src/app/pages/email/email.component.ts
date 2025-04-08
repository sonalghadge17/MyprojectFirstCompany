import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Email } from './email';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss'
})
export class EmailComponent {
  @ViewChild('emailModal') emailModal: TemplateRef<any> | undefined;
  emailData:any
email: any;
  constructor() {}
  openEmailModal() {
    // this.dialog.open(this.emailModal);
  }
  onSubmit(){

  }
}