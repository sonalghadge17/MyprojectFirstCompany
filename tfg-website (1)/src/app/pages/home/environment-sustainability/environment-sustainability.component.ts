import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-environment-sustainability',
  templateUrl: './environment-sustainability.component.html',
  styleUrl: './environment-sustainability.component.scss'
})
export class EnvironmentSustainabilityComponent {

  constructor(
    public modal: NgbActiveModal,
  ){}

  ngOnInit(){

  }

}
