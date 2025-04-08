import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterOffersComponent } from './counter-offers.component';

describe('CounterOffersComponent', () => {
  let component: CounterOffersComponent;
  let fixture: ComponentFixture<CounterOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterOffersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
