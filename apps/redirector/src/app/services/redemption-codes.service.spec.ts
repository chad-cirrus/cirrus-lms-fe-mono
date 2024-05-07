import { TestBed } from '@angular/core/testing';

import { RedemptionCodesService } from './redemption-codes.service';

describe('RedemptionCodesService', () => {
  let service: RedemptionCodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedemptionCodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
