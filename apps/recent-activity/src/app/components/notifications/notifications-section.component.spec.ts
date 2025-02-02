import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsSectionComponent } from './notifications-section.component';
import { BadgeComponent } from '@cirrus/badge';
import { MockComponent } from 'ng-mocks';

describe('NotificationsComponent', () => {
  let component: NotificationsSectionComponent;
  let fixture: ComponentFixture<NotificationsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsSectionComponent, MockComponent(BadgeComponent)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
