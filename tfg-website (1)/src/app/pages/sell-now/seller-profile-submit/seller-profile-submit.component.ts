import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-seller-profile-submit',
  templateUrl: './seller-profile-submit.component.html',
  styleUrl: './seller-profile-submit.component.scss'
})
export class SellerProfileSubmitComponent {

  constructor(
    public modal: NgbActiveModal,
  ){}

  ngOnInit(){

  }

}
