import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

const _user = {
  admin: null,
  authentication_token: 'SAx_Q45cGMjqwVF9NMiw',
  authentication_token_created_at: '2021-07-14T17:25:08.845Z',
  created_at: '2019-02-09T16:21:45.849Z',
  ctc_admin: true,
  deactivated: false,
  email: 'bparke@gibberish.com',
  full_sfid: '0050zzzrrr7uqneQAM',
  id: 282,
  nts_user_id: 'azfootball99@gibberish.com',
  role: 'instructor',
  salesforce_id: '00571000007bame',
  session_index: null,
  sf_lms_role: '2',
  token_expires: '2024-06-16T17:36:03.901Z',
  updated_at: '2024-05-17T17:36:03.901Z',
  name: 'Brian Parke',
  firstname: 'Brian',
  lastname: 'Parke',
  instructor: {
    id: 154,
    firstName: null,
    lastName: null,
    user_id: 282,
    created_at: '2019-02-10T00:48:49.330Z',
    updated_at: '2019-02-10T00:48:49.330Z',
    active: true,
  },
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();
    window.localStorage.setItem('cirrus-user', JSON.stringify(_user));

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
