import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSideNavComponent } from './global-side-nav.component';

describe('GlobalSideNavComponent', () => {
  let component: GlobalSideNavComponent;
  let fixture: ComponentFixture<GlobalSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalSideNavComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
