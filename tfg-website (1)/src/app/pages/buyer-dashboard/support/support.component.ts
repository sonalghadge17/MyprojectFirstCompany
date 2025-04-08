import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent {

  supportForm!:FormGroup;
  selectedFile: any;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  loadForm(){
    this.supportForm = this.fb.group({
      queryId:[,],
      email:[,],
      screenShot:[,]
    })
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
    }
  }

  clearFile(): void {
    this.selectedFile = null;
  }

}
