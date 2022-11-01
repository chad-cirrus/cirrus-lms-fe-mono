import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalHamburgerMenuComponent } from './global-hamburger-menu.component';

describe('GlobalHamburgerMenuComponent', () => {
  let component: GlobalHamburgerMenuComponent;
  let fixture: ComponentFixture<GlobalHamburgerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalHamburgerMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalHamburgerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
