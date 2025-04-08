import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  changePasswordForm!:FormGroup;

  constructor(
    private fb: FormBuilder,
  ){}

  ngOnInit(){
    this.loadForm();
  }

  loadForm(){
    this.changePasswordForm = this.fb.group({
      oldPassword: [,],
      newPassword: [,],
    })
  }
}
