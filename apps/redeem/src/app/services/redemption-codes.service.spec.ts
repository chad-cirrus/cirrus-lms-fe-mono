import { TestBed } from '@angular/core/testing';

import { RedemptionCodesService } from './redemption-codes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RedemptionCodesService', () => {
  let service: RedemptionCodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RedemptionCodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
