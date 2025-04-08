import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PasswordGetModalComponent } from './shared/components/password-get-modal/password-get-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'velzon';
  isVerified:any;
  constructor(private modalService:NgbModal,
              private router:Router
  ){
    const isVeri = localStorage?.getItem('isVerified')
    this.isVerified = JSON.parse(isVeri!)
    debugger

  }

  ngOnInit(): void {
    if(!this.isVerified){
      this.router.navigate(['password-protection']).then(()=>{
        const modalRef = this.modalService.open(PasswordGetModalComponent,{backdrop:'static', backdropClass: 'custom-backdrop',})
        modalRef.result.then(()=>{},()=>{})
      })
      
    }
  }
}
