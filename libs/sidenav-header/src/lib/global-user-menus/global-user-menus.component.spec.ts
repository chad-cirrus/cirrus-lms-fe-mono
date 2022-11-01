import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalUserMenusComponent } from './global-user-menus.component';

describe('GlobalUserMenusComponent', () => {
  let component: GlobalUserMenusComponent;
  let fixture: ComponentFixture<GlobalUserMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalUserMenusComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalUserMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
