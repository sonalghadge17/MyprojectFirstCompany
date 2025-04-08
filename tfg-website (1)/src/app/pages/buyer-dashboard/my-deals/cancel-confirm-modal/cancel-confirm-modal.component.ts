import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-cancel-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cancel-confirm-modal.component.html',
  styleUrl: './cancel-confirm-modal.component.scss'
})
export class CancelConfirmModalComponent {
  currentUser:any;
   public modal = inject(NgbActiveModal);
   private authFakeService = inject(AuthfakeauthenticationService);

   ngOnInit(): void {
      const currentUser = this.authFakeService.currentUserValue
      if(currentUser){
        this.currentUser = currentUser;
      }
   }
}
