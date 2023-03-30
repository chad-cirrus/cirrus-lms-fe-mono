import { TestBed } from '@angular/core/testing';

import { FeatureFlagService } from './feature-flag.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FeatureFlagService', () => {
  let service: FeatureFlagService;
  let environment: Record<string, unknown> = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: 'environment', useValue: environment },
      ],
    });
    service = TestBed.inject(FeatureFlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
