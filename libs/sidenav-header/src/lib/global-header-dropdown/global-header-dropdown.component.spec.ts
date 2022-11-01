import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalHeaderDropdownComponent } from './global-header-dropdown.component';

describe('GlobalHeaderDropdownComponent', () => {
  let component: GlobalHeaderDropdownComponent;
  let fixture: ComponentFixture<GlobalHeaderDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalHeaderDropdownComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalHeaderDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
