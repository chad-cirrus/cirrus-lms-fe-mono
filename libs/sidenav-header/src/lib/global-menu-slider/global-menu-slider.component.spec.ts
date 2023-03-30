import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalMenuSliderComponent } from './global-menu-slider.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('GlobalMenuSliderComponent', () => {
  let component: GlobalMenuSliderComponent;
  let fixture: ComponentFixture<GlobalMenuSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalMenuSliderComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMenuSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
