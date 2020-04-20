import { TestBed } from '@angular/core/testing';

import { RetrogamerService } from './retrogamer.service';

describe('RetrogamerService', () => {
  let service: RetrogamerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrogamerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
