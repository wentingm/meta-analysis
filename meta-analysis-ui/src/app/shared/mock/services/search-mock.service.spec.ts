import { TestBed } from '@angular/core/testing';

import { SearchMockService } from './search-mock.service';

describe('SearchMockService', () => {
  let service: SearchMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
