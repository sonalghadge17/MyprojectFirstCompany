import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HideShowServiceService {

  constructor() { }

  private displayHeaderSubject = new BehaviorSubject<boolean>(false);
  displayHeader$ = this.displayHeaderSubject.asObservable();

  setDisplayHeader(value: boolean) {
    this.displayHeaderSubject.next(value);
  }
}
