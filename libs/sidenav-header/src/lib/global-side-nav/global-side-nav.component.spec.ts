import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSideNavComponent } from './global-side-nav.component';
import { ICirrusUser } from '@cirrus/models';
import { MockComponent } from 'ng-mocks';
import { BadgeComponent } from '@cirrus/badge';

describe('GlobalSideNavComponent', () => {
  let component: GlobalSideNavComponent;
  let fixture: ComponentFixture<GlobalSideNavComponent>;
  let nullCirrusUser: ICirrusUser = {
    authentication_token: '',
    ctc_admin: false,
    deactivated: false,
    email: '',
    firstname: '',
    full_sfid: '',
    id: 0,
    lastname: '',
    name: '',
    role: 'pilot',
    salesforce_id: '',
    sf_lms_role: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalSideNavComponent, MockComponent(BadgeComponent)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSideNavComponent);
    component = fixture.componentInstance;
    component.cirrusUser = nullCirrusUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
