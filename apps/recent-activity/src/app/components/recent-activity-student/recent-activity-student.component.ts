import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { RecentActivityService } from '../../services/recent-activity.service';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';

import { MatSidenav } from '@angular/material/sidenav';
import { SidenavHeaderService } from '@cirrus/sidenav-header';
import {
  ICoursesForRecentActivity,
  ISearchInputData,
  PROGRESS_STATUS,
} from '@cirrus/models';
import { IRecentActivityNotifications } from '../../models/IRecentActivityNotifications';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserState } from '../../store/reducers/cirrus-user.reducer';

@Component({
  selector: 'cirrus-recent-activity-student',
  templateUrl: './recent-activity-student.component.html',
  styleUrls: ['./recent-activity-student.component.scss'],
})
export class RecentActivityStudentComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;
  @Output() toggleViewEmit = new EventEmitter();
  @Input() user!: UserState | null;
  @Input() instructorHours!: number | null;
  @Input() studentHours!: number | null;

  events: string[] = [];
  opened!: boolean;
  courseInputVal = new UntypedFormControl('');

  private _filteredTextSubject: Subject<string> = new Subject();
  filteredText$: Observable<string> = this._filteredTextSubject.asObservable();

  private _courseInputSubject: Subject<string> = new Subject();
  courseInput$: Observable<string> = this._courseInputSubject.asObservable();

  recentActivityNotifications$ =
    this.recentActivityService.recentActivityNotifications$;

  courses$ = this.recentActivityNotifications$.pipe(
    map(
      recentActivityNotifications =>
        recentActivityNotifications.recentActivity.courses
    )
  );

  filteredCourses$: Observable<ISearchInputData[]> = combineLatest([
    this.filteredText$,
    this.courses$,
  ]).pipe(
    map(([input, courses]) => {
      if (!input) {
        return;
      }
      return courses.filter(course =>
        course.name.toLowerCase().includes(input.toLowerCase())
      );
    }),
    map(courses => {
      if (!courses) {
        return [];
      }
      return courses.map(course => {
        return {
          name: course.title,
          status: course.status,
          courseId: course.id,
        };
      });
    })
  );

  inProgressCourses$: Observable<ICoursesForRecentActivity[]> =
    this.recentActivityNotifications$.pipe(
      map((resp: IRecentActivityNotifications) =>
        resp.recentActivity.courses.filter(
          (course: ICoursesForRecentActivity) =>
            course.status === PROGRESS_STATUS.in_progress
        )
      )
    );

  constructor(
    private recentActivityService: RecentActivityService,
    private store: Store<AppState>,
    private sidenavHeaderService: SidenavHeaderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.recentActivityService.getRecentActivityAndNotifications();

    this.courseInputVal.valueChanges
      .pipe(
        tap(input => {
          this._courseInputSubject.next(input);
        })
      )
      .subscribe();
  }

  toggleView() {
    this.toggleViewEmit.emit('instructor');
  }

  filterText(val: string) {
    this._filteredTextSubject.next(val);
  }

  viewAllNotifications() {
    this.sidenavHeaderService.setShowNotifications(true);
  }

  emitNavigation($event: ISearchInputData) {
    this.router.navigate(['courses', $event.courseId]);
  }
}
