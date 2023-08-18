import { TestBed } from '@angular/core/testing';

import { ReturnPathService } from './return-path.service';

describe('ReturnPathService', () => {
  let service: ReturnPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
