import { TestBed } from '@angular/core/testing';

import { WhitepaperService } from './whitepaper.service';

describe('WhitepaperService', () => {
  let service: WhitepaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhitepaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
