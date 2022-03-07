import { TestBed } from '@angular/core/testing';

import { GetInterceptorService } from './get-interceptor.service';

describe('GetInterceptorService', () => {
  let service: GetInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
