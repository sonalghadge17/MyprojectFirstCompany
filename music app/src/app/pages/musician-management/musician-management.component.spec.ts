import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicianManagementComponent } from './musician-management.component';

describe('MusicianManagementComponent', () => {
  let component: MusicianManagementComponent;
  let fixture: ComponentFixture<MusicianManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicianManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MusicianManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
