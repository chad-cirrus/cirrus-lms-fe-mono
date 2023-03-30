import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInitialsComponent } from './profile-initials.component';
import { DisplayInitialsPipe } from './display-initials.pipe';

describe('ProfileInitialsComponent', () => {
  let component: ProfileInitialsComponent;
  let fixture: ComponentFixture<ProfileInitialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileInitialsComponent, DisplayInitialsPipe],
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
