import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseLessonsComponent } from './course-lessons.component';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { SearchInputComponent } from '@cirrus/search-input';
import { FilterComponent } from '@cirrus/ui';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ICourseOverview } from '@cirrus/models'; // Import ICourseOverview interface

describe('CourseLessonsComponent', () => {
  let component: CourseLessonsComponent;
  let fixture: ComponentFixture<CourseLessonsComponent>;
  const environment = { baseUrl: 'http://cirrusapproach.local:3000' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatDialogModule,
      ],
      declarations: [
        CourseLessonsComponent,
        MockComponent(SearchInputComponent),
        MockComponent(FilterComponent),
      ],
      providers: [{ provide: 'environment', useValue: environment }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonsComponent);
    component = fixture.componentInstance;
    component.course = {} as ICourseOverview;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
