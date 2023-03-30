import { TestBed } from '@angular/core/testing';

import { ConnectionsService } from './connections.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConnectionsService', () => {
  let service: ConnectionsService;
  let environment: Record<string, unknown> = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: 'environment', useValue: environment },
      ]
    });
    service = TestBed.inject(ConnectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
