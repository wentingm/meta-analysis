import { TestBed } from '@angular/core/testing';

import { SignupMockService } from './signup-mock.service';

describe('SignupMockService', () => {
  let service: SignupMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
