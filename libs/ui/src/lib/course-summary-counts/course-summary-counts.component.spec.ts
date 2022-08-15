import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSummaryCountsComponent } from './course-summary-counts.component';

describe('CourseSummaryCountsComponent', () => {
  let component: CourseSummaryCountsComponent;
  let fixture: ComponentFixture<CourseSummaryCountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseSummaryCountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSummaryCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
