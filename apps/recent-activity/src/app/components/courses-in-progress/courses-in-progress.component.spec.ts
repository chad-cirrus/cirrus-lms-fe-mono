import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesInProgressComponent } from './courses-in-progress.component';

jest.mock('swiper', () => ({
  Swiper: { use() {} },
  Navigation: () => null,
  Pagination: () => null,
}));

describe('CoursesInProgressComponent', () => {
  let component: CoursesInProgressComponent;
  let fixture: ComponentFixture<CoursesInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesInProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
