import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDetailsModalComponent } from './country-details-modal.component';

describe('CountryDetailsModalComponent', () => {
  let component: CountryDetailsModalComponent;
  let fixture: ComponentFixture<CountryDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryDetailsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
