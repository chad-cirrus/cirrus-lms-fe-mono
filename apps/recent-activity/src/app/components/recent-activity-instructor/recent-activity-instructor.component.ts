import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ISearchInputData } from '@cirrus/models';
import { SidenavHeaderService } from '@cirrus/sidenav-header';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecentActivityService } from '../../services/recent-activity.service';
import { UserState } from '../../store/reducers/cirrus-user.reducer';

@Component({
  selector: 'cirrus-recent-activity-instructor',
  templateUrl: './recent-activity-instructor.component.html',
  styleUrls: ['./recent-activity-instructor.component.scss'],
})
export class RecentActivityInstructorComponent implements OnInit {
  @Output() toggleViewEmit = new EventEmitter();
  @Input() user!: UserState | null;
  @Input() instructorHours!: number | null;
  @Input() studentHours!: number | null;
  @Input() isFeatureFlagEnabled!: boolean | null;

  searchParam = new FormControl('');

  private _filteredTextSubject = new Subject<string>();
  filteredText$: Observable<string> = this._filteredTextSubject.asObservable();

  recentActivityNotificationsInstructors$ =
    this.recentActivityService.recentActivityNotificationsInstructors$;

  filteredStudents$!: Observable<ISearchInputData[]>;

  students$ = this.recentActivityNotificationsInstructors$.pipe(
    map(ra => ra.recentActivity.instructor_students.students),
    map(students =>
      students.filter(
        student => (student.first_name !== null && student.last_name) || null
      )
    )
  );

  constructor(
    private recentActivityService: RecentActivityService,
    private sidenavHeaderService: SidenavHeaderService
  ) {}

  ngOnInit(): void {
    this.recentActivityService.getRecentActivityAndNotificationsInstructor();

    this.filteredStudents$ = combineLatest([
      this.filteredText$,
      this.students$,
    ]).pipe(
      map(([text, students]) => {
        return students.filter(student => {
          const formatStudentName =
            `${student.first_name} ${student.last_name}`.toLowerCase();
          if (formatStudentName.includes(text.toLowerCase())) {
            return student;
          }
          return;
        });
      }),
      map(students => {
        return students.map(student => {
          return {
            name: `${student.first_name} ${student.last_name}`,
            status: student.connection.status,
          };
        });
      })
    );
  }

  filterText(val: string) {
    this._filteredTextSubject.next(val);
  }

  viewAllNotifications() {
    this.sidenavHeaderService.setShowNotifications(true);
  }

  toggleView() {
    this.toggleViewEmit.emit('student');
  }

  emitNavigation(e: any) {
    // Navigate to student
  }
}
