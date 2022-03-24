import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { testData } from '@cirrus/models';
import { MockComponent } from 'ng-mocks';
import { LessonContentItemComponent } from '../lesson-content-item/lesson-content-item.component';

import { LessonContentsComponent } from './lesson-contents.component';

describe('LessonContentsComponent', () => {
  let component: LessonContentsComponent;
  let fixture: ComponentFixture<LessonContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlexLayoutModule],
      declarations: [
        LessonContentsComponent,
        MockComponent(LessonContentItemComponent),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonContentsComponent);
    component = fixture.componentInstance;
    component.lesson = testData;
    component.instructorView = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
