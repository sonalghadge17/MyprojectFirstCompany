import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-country-details-modal',
  templateUrl: './country-details-modal.component.html',
  styleUrl: './country-details-modal.component.scss'
})
export class CountryDetailsModalComponent{

  @Input() countryName!: string;
  @Input() latitude!: number;
  @Input() longitude!: number;

  constructor(
    public modal: NgbActiveModal,
  ){}

  ngOnInit(){

  }
}
