import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
// import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-our-mission',
  templateUrl: './our-mission.component.html',
  styleUrl: './our-mission.component.scss'
})
export class OurMissionComponent {
  // icons = {faLeftLong,faArrowRightLong }
  constructor(private router:Router){

  }

  goToProductsPage(){
    this.router.navigateByUrl('')
  }
}
