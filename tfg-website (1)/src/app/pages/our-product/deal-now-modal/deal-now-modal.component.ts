import { Component, HostListener, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryListService } from 'src/app/core/services/country-list.service';
import { DealSuccessModalComponent } from './deal-success-modal/deal-success-modal.component';

@Component({
  selector: 'app-deal-now-modal',
  templateUrl: './deal-now-modal.component.html',
  styleUrl: './deal-now-modal.component.scss'
})
export class DealNowModalComponent {
  @Input() selectedItem:any;
  countries: any[] = [];

  selectedCountry: any;

  isCol12 = false;
  constructor(public modal:NgbActiveModal,
    private countryListService: CountryListService,
    private modalService:NgbModal
  ){
    this.countries = countryListService.getCountries();
    
    // const findIndex = this.countries.findIndex((item)=> item.name == 'India')

    // debugger
    this.checkScreenWidth();
  }
  ngOnInit(): void {
     this.selectedCountry = 'India'
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }
  checkScreenWidth() {
    this.isCol12 = window.innerWidth < 576;
  }

  dealDone(){
    this.modal.close();
    const modalRef = this.modalService.open(DealSuccessModalComponent,{centered:true})
    modalRef.result.then(()=>{},()=>{})
  }

  
}
