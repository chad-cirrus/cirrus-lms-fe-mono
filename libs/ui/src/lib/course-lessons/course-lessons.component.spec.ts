import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonsComponent } from './course-lessons.component';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { SearchInputComponent } from '@cirrus/search-input';
import { FilterComponent } from '@cirrus/ui';

describe('CourseLessonsComponent', () => {
  let component: CourseLessonsComponent;
  let fixture: ComponentFixture<CourseLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatMenuModule, FormsModule, ReactiveFormsModule],
      declarations: [CourseLessonsComponent, MockComponent(SearchInputComponent), MockComponent(FilterComponent)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
