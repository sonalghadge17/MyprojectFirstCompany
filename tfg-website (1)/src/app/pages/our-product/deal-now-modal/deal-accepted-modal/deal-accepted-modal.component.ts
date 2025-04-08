import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deal-accepted-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deal-accepted-modal.component.html',
  styleUrl: './deal-accepted-modal.component.scss'
})
export class DealAcceptedModalComponent {
 constructor(public modal:NgbActiveModal,
 
  ){
  
  }
}
