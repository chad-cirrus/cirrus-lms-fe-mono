import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Attempt } from '@cirrus/models';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LessonContentComponent } from '../LessonContentComponent';

@Component({
  selector: 'cirrus-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AssessmentComponent
  extends LessonContentComponent
  implements OnInit
{
  @ViewChild('tabs') tabGroup!: MatTabGroup;
  attempt!: Attempt;
  tablet$!: Observable<boolean>;
  mobile$!: Observable<boolean>;
  _isMenuOpen!: boolean;
  attempt_index!: number;

  logbookLabel$!: Observable<string>;

  constructor(private breakpointObserver: BreakpointObserver) {
    super();
  }

  displayedColumns = [
    'name',
    'task_type',
    'required_successful_attempts',
    'passed_count',
    'missed_count',
    'status',
  ];

  columns = [
    {
      name: 'TASK',
      mat_col_name: 'name',
    },
    {
      name: 'TYPE',
      mat_col_name: 'task_type',
    },

    {
      name: 'REQUIRED',
      mat_col_name: 'required_successful_attempts',
    },
    {
      name: 'PASSED',
      mat_col_name: 'passed_count',
    },
    {
      name: 'MISSED',
      mat_col_name: 'missed_count',
    },
    {
      name: 'STATUS',
      mat_col_name: 'status',
    },
  ];

  @Input()
  public get menuOpen(): boolean {
    return this._isMenuOpen;
  }

  public set menuOpen(value: boolean) {
    this._isMenuOpen = value;
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.tablet$ = this.breakpointObserver.observe('(max-width: 959px)').pipe(
      map(({ matches }) => {
        return matches;
      })
    );

    this.mobile$ = this.breakpointObserver.observe('(max-width: 600px)').pipe(
      map(({ matches }) => {
        return matches;
      })
    );

    this.logbookLabel$ = combineLatest([this.tablet$, this.mobile$])
      .pipe(
        map(([isTablet, isMobile]) => {
          if (isTablet || isMobile) {
            return 'Logbook';
          } else {
            return 'Logbook Entry';
          }
        }),
      );
  }

  handleBack() {
    this.show();
    this.tabGroup.selectedIndex = 0;
  }

  handleEmitRow($event: any) {
    this.tabGroup.selectedIndex = 2;
    this.hide();
    this.attempt = $event.event;
    this.attempt_index = $event.index;
  }

  hide() {
    this.hidePrevAndNext.emit(true);
  }

  show() {
    this.hidePrevAndNext.emit(false);
  }
}
