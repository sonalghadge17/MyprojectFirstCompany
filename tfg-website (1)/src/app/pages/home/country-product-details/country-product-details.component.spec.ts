import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryProductDetailsComponent } from './country-product-details.component';

describe('CountryProductDetailsComponent', () => {
  let component: CountryProductDetailsComponent;
  let fixture: ComponentFixture<CountryProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryProductDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
