import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
class ParentData {
  heading?:string
  para1?:string
  para2?:string
}

@Component({
  selector: 'app-deal-success-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deal-success-modal.component.html',
  styleUrl: './deal-success-modal.component.scss'
})
export class DealSuccessModalComponent {
  @Input() data!:ParentData;

  constructor(public modal:NgbActiveModal,
 
  ){
  
  }

}
