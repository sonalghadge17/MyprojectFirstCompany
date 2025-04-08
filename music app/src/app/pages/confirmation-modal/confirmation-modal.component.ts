import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  @Input() message!: string;
  @Input() currentStatus!: string;
  reason: string = '';
  constructor(public activeModal: NgbActiveModal,private toastr:ToastrService) {

  }
  confirm() {
    // if (this.currentStatus === 'ACTIVE' && !this.reason.trim()) {
    //   this.toastr.info('Please provide a reason for deactivation.');
    //   return;
    // }
    this.activeModal.close({ confirmed: true });
  }
  cancel() {
    this.activeModal.close({ confirmed: false });
  }
}
