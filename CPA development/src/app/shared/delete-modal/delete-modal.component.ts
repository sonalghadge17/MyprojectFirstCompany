import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  public isLoading = false;
    @Input() type!: any;

  constructor(public modal: NgbActiveModal) { }
  ngOnInit(): void {
    console.log(this.type)
  }
}

