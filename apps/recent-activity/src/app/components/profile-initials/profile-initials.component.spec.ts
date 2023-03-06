import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInitialsComponent } from './profile-initials.component';

describe('ProfileInitialsComponent', () => {
  let component: ProfileInitialsComponent;
  let fixture: ComponentFixture<ProfileInitialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileInitialsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInitialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
