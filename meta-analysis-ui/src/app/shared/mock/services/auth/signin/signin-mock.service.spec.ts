import { TestBed } from '@angular/core/testing';

import { SigninMockService } from './signin-mock.service';

describe('SigninMockService', () => {
  let service: SigninMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigninMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
