import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSliderComponent } from './menu-slider.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MenuSliderComponent', () => {
  let component: MenuSliderComponent;
  let fixture: ComponentFixture<MenuSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
      ],
      declarations: [ MenuSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
