import { TestBed } from '@angular/core/testing';

import { RecentActivityFacade } from './recent-activity-facade.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ConnectionsService,
  FeatureFlagService,
  NotificationService,
  UiDownloadService,
  FullstoryService
} from '@cirrus/ui';

describe('RecentActivityFacade', () => {
  let service: RecentActivityFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ConnectionsService, useClass: MockConnectionsService },
        { provide: UiDownloadService, useClass: MockUIDownloadService },
        { provide: NotificationService, useClass: MockNotificationService },
        { provide: FeatureFlagService, useClass: MockFeatureFlagService },
        { provide: FullstoryService, useClass: MockFullstoryService}
      ],
    });
    service = TestBed.inject(RecentActivityFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

class MockConnectionsService {}
class MockUIDownloadService {}
class MockNotificationService {}
class MockFeatureFlagService {}
class MockFullstoryService {}
