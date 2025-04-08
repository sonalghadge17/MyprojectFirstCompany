import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cancel-model',
  templateUrl: './cancel-model.component.html',
  styleUrl: './cancel-model.component.scss'
})
export class CancelModelComponent {

  constructor(public modal:NgbActiveModal,){}

}
