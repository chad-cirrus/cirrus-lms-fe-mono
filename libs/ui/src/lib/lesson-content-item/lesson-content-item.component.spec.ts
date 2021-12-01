import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonContentItemComponent } from './lesson-content-item.component';

describe('LessonContentItemComponent', () => {
  let component: LessonContentItemComponent;
  let fixture: ComponentFixture<LessonContentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonContentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
