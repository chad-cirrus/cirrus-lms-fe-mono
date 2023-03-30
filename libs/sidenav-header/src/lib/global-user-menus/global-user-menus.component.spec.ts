import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalUserMenusComponent } from './global-user-menus.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { GlobalHeaderDropdownComponent } from '../global-header-dropdown/global-header-dropdown.component';
import { MockComponent } from 'ng-mocks';

describe('GlobalUserMenusComponent', () => {
  let component: GlobalUserMenusComponent;
  let fixture: ComponentFixture<GlobalUserMenusComponent>;
  let environment: Record<string, unknown> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalUserMenusComponent, MockComponent(GlobalHeaderDropdownComponent)],
      providers: [
        { provide: 'environment', useValue: environment },
      ],
      imports:[OverlayModule]
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
