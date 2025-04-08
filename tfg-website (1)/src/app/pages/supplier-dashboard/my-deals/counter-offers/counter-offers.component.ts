import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThankYouModelComponent } from './thank-you-model/thank-you-model.component';

@Component({
  selector: 'app-counter-offers',
  templateUrl: './counter-offers.component.html',
  styleUrl: './counter-offers.component.scss'
})
export class CounterOffersComponent {
  imgUrl:string | null | ArrayBuffer ='assets/product_apple.png'


  isCol12 = false;
  constructor(public modal:NgbActiveModal, private modalService: NgbModal,){
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }
  checkScreenWidth() {
    this.isCol12 = window.innerWidth < 576;
  }

  thankUModel(){
    this.modal.close()
    const modalRef = this.modalService.open(ThankYouModelComponent, { size: 'md', centered: true });
  }
}
