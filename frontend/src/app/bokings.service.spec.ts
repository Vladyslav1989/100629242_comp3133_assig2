import { TestBed } from '@angular/core/testing';

import { BokingsService } from './bokings.service';

describe('BokingsService', () => {
  let service: BokingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BokingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
