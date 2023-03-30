import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsMenuComponent } from './notifications-menu.component';
import { MockComponent } from 'ng-mocks';
import { BadgeComponent } from '@cirrus/badge';

describe('NotificationsMenuComponent', () => {
  let component: NotificationsMenuComponent;
  let fixture: ComponentFixture<NotificationsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsMenuComponent, MockComponent(BadgeComponent)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
