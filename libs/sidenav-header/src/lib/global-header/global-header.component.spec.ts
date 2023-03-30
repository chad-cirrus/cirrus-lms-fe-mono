import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalHeaderComponent } from './global-header.component';
import { MockComponent } from 'ng-mocks';
import { BadgeComponent } from '@cirrus/badge';
import { GlobalUserMenusComponent } from '../global-user-menus/global-user-menus.component';

describe('GlobalHeaderComponent', () => {
  let component: GlobalHeaderComponent;
  let fixture: ComponentFixture<GlobalHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalHeaderComponent, MockComponent(BadgeComponent), MockComponent(GlobalUserMenusComponent)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
