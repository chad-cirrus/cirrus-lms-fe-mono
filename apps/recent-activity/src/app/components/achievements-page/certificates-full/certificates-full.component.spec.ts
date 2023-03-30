import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatesFullComponent } from './certificates-full.component';
import { RecentActivityFacade } from '../../../recent-activity-facade.service';
import { UiDownloadService } from '@cirrus/ui';

describe('CertificatesFullComponent', () => {
  let component: CertificatesFullComponent;
  let fixture: ComponentFixture<CertificatesFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificatesFullComponent],
      providers: [
        { provide: RecentActivityFacade, useClass: MockRecentActivityFacade },
        { provide: UiDownloadService, useClass: MockUIDownloadService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatesFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockRecentActivityFacade {}
class MockUIDownloadService {}
