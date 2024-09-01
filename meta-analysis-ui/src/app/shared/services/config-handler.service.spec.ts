import { TestBed } from '@angular/core/testing';
import { ConfigHandlerService } from './config-handler.service';


describe('ConfigHandlerService', () => {
  let service: ConfigHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
