import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalHeaderDropdownComponent } from './global-header-dropdown.component';
import { ICirrusUser } from '@cirrus/models';

describe('GlobalHeaderDropdownComponent', () => {
  let component: GlobalHeaderDropdownComponent;
  let fixture: ComponentFixture<GlobalHeaderDropdownComponent>;
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
    role: '',
    salesforce_id: '',
    sf_lms_role: ''
  };
  let isScreenSmall = false;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalHeaderDropdownComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalHeaderDropdownComponent);
    component = fixture.componentInstance;
    component.cirrusUser = nullCirrusUser;
    component.isScreenSmall = isScreenSmall;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
