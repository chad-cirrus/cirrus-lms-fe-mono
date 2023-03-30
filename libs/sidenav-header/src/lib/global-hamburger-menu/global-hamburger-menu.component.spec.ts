import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalHamburgerMenuComponent } from './global-hamburger-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { ICirrusUser } from '@cirrus/models';
import { BadgeComponent } from '@cirrus/badge';
import { MockComponent } from 'ng-mocks';

describe('GlobalHamburgerMenuComponent', () => {
  let component: GlobalHamburgerMenuComponent;
  let fixture: ComponentFixture<GlobalHamburgerMenuComponent>;
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
      declarations: [GlobalHamburgerMenuComponent, MockComponent(BadgeComponent)],
      imports: [MatMenuModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalHamburgerMenuComponent);
    component = fixture.componentInstance;
    component.cirrusUser = nullCirrusUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
