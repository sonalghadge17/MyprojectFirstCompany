import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWhitepaperComponent } from './add-whitepaper.component';

describe('AddWhitepaperComponent', () => {
  let component: AddWhitepaperComponent;
  let fixture: ComponentFixture<AddWhitepaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWhitepaperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWhitepaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
