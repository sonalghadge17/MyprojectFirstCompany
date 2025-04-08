import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FevouriteProductsComponent } from './fevourite-products.component';

describe('FevouriteProductsComponent', () => {
  let component: FevouriteProductsComponent;
  let fixture: ComponentFixture<FevouriteProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FevouriteProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FevouriteProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
