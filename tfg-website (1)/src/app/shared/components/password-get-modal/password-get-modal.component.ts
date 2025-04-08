import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-get-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-get-modal.component.html',
  styleUrl: './password-get-modal.component.scss'
})
export class PasswordGetModalComponent {
  passwordId = 'W5fH8uV!dRtY#4zQ9'

  constructor(public modal: NgbActiveModal,
              private router:Router
  ){}
  onSubmit(pass:string){
    debugger
    if(pass === this.passwordId){
      localStorage.setItem('isVerified',JSON.stringify(true))
      // setTimeout(() => {
        this.router.navigate(['/']).then(()=>{
          location.reload();
        })
      // },100);
    }
  }
  
}
