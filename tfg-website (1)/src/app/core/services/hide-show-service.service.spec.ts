import { TestBed } from '@angular/core/testing';

import { HideShowServiceService } from './hide-show-service.service';

describe('HideShowServiceService', () => {
  let service: HideShowServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HideShowServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
