import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileMenuComponent } from './user-profile-menu.component';

describe('UserProfileMenuComponent', () => {
  let component: UserProfileMenuComponent;
  let fixture: ComponentFixture<UserProfileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
