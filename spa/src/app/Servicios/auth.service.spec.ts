import { TestBed } from '@angular/core/testing';

import { Authorization } from './authorization.service';

describe('AuthService', () => {
  let service: Authorization;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authorization);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
