import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FevouriteSuppliersComponent } from './fevourite-suppliers.component';

describe('FevouriteSuppliersComponent', () => {
  let component: FevouriteSuppliersComponent;
  let fixture: ComponentFixture<FevouriteSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FevouriteSuppliersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FevouriteSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
