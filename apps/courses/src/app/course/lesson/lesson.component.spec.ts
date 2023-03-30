import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonComponent } from './lesson.component';
import { ActivatedRoute, Params } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ContentPlayerDialogService } from '../../content-player/content-player-dialog.service';
import { CoursesService } from '../course.service';
import { MatDialogModule } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import {
  LessonLandingPageComponent,
} from '../../../../../../libs/ui/src/lib/lesson-landing-page/lesson-landing-page.component';
import { MockComponent } from 'ng-mocks';

describe('LessonComponent', () => {
  let component: LessonComponent;
  let fixture: ComponentFixture<LessonComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessonComponent, MockComponent(LessonLandingPageComponent)],
      providers: [
        provideMockStore(),
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: ContentPlayerDialogService, useClass: MockContentPlayerDialogService },
        { provide: CoursesService, useClass: MockCoursesService },
      ],
      imports: [MatDialogModule, MatSidenavModule, NoopAnimationsModule, MatListModule],
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockActivatedRoute {
  get params(): Observable<Params> {
    return of({});
  }
}

class MockContentPlayerDialogService {}
class MockCoursesService {
  lessonComplete$ = of('');
}
