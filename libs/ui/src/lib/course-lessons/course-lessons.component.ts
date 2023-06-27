import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import {
  FilterMenuSection,
  ICourseOverview,
  ICourseOverviewLesson,
  ICourseOverviewStage,
  ISearchInputData,
  TermsAgreementSubtitleText,
} from '@cirrus/models';
import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  Observable,
  Subject,
} from 'rxjs';

import { debounceTime, map, startWith, tap } from 'rxjs/operators';
import { StageLessonNavigationEvent } from '../StageLessonNavigationEvent';
import { TermsAgreementServiceService } from '../course-landing-page/terms-agreement-service.service';

@Component({
  selector: 'cirrus-course-lessons',
  templateUrl: './course-lessons.component.html',
  styleUrls: ['./course-lessons.component.scss'],
})
export class CourseLessonsComponent implements OnInit {
  private _stages!: ICourseOverviewStage[];
  stagesSubject = new BehaviorSubject<ICourseOverviewStage[]>([]);
  lessonsSubject = new BehaviorSubject<ICourseOverviewLesson[]>([]);
  filteredStages$!: Observable<ICourseOverviewStage[]>;
  filteredLessons$!: Observable<ISearchInputData[]>;

  @Input() course!: ICourseOverview;

  private _filteredTextSubject = new Subject<string>();
  filteredText$: Observable<string> = this._filteredTextSubject.asObservable();

  @Input()
  set stages(value: ICourseOverviewStage[]) {
    this._stages = value;
    const combineTotalLessonsCount = value.map(stage => stage.lessons);
    const combine = this.combineLessons(combineTotalLessonsCount);
    this.lessonsOverallCount = combine.length;
    this.stagesSubject.next(value);
    this.lessonsSubject.next(combine);

    this.previewVideoEnabledIds = this.videoPreviewLessonIds(combine);

    this.filterMenuSections = [
      { title: 'Status', items: ['completed', 'in_progress', 'not_started'] },
      { title: 'Stages', items: this.getStageTitles(this._stages) },
    ];
  }

  get stages() {
    return this._stages;
  }

  previewVideoEnabledIds!: number[];

  filterMenuSections!: FilterMenuSection[];

  lessonsDisplayedCount = 0;
  lessonsOverallCount = 0;
  showDropdown = true;

  @Output() navigate = new EventEmitter<StageLessonNavigationEvent>();

  filterForm = new UntypedFormGroup({
    filterText: new UntypedFormControl(null),
    filterCheckbox: new UntypedFormArray([]),
  });

  changes!: string[];

  get array() {
    return this.filterForm.get('filterCheckbox');
  }

  get checkboxArray() {
    return this.filterForm.get('filterCheckbox') as UntypedFormArray;
  }

  constructor(private tcService: TermsAgreementServiceService) {}

  ngOnInit() {
    this.filteredStages$ = combineLatest([
      this.checkboxArray.valueChanges.pipe(startWith([])),
      this.stagesSubject,
    ]).pipe(
      map(([changes, stages]) => {
        this.changes = changes;
        return stages.filter(stage => this.filteredStages(changes, stage));
      }),
      map(stage => {
        return stage.map(stage => ({
          ...stage,
          lessons: stage.lessons.filter(l => {
            return this.isProgressFiltered(this.changes)
              ? this.changes.includes(l.progress.status)
              : l;
          }),
        }));
      }),
      map(stage => {
        return stage.filter(s => s.lessons.length);
      }),
      tap(stages => {
        const combineDisplayedLessons = stages.map(s => s.lessons);
        this.lessonsDisplayedCount = this.combineLessons(
          combineDisplayedLessons
        ).length;
      })
    );

    this.filteredLessons$ = combineLatest([
      this.filteredText$,
      this.lessonsSubject,
    ]).pipe(
      map(([changes, lessons]) => {
        return !changes
          ? []
          : lessons.filter(l => {
              const format = l.progress.status.replace('_', ' ');
              return (
                l.title.toLowerCase().includes(changes.toLowerCase()) ||
                format.toLowerCase().includes(changes.toLowerCase())
              );
            });
      }),
      map(lessons =>
        lessons.map(lesson => {
          return {
            name: lesson.title,
            status: lesson.progress.status,
            stageId: lesson.stage_id,
            lessonId: lesson.id,
          };
        })
      )
    );
  }

  videoPreviewLessonIds(lessons: any[]) {
    return lessons.filter((l, i) => i < 4).map(l => l.id);
  }

  getStageTitles(stages: ICourseOverviewStage[]) {
    return stages.map(stage => {
      return stage.title;
    });
  }

  combineLessons(lessons: any) {
    return [].concat(...Object.keys(lessons).map(k => lessons[k]));
  }

  filteredStages(changes: any, stage: ICourseOverviewStage) {
    const includesAStage = changes.filter((c: any) =>
      this.getStageTitles(this._stages).includes(c)
    );
    if (!changes.length || !includesAStage.length) {
      return true;
    }
    if (changes.includes(stage.title)) {
      return true;
    } else {
      return false;
    }
  }

  filteredBoxes(changes: string[], stage: ICourseOverviewStage) {
    if (!changes.length) {
      return true;
    }

    if (this.isProgressFiltered(changes)) {
      return changes.includes(stage.progress.status);
    } else {
      return true;
    }
  }

  filterText(val: string) {
    this._filteredTextSubject.next(val);
  }

  isProgressFiltered(changes: any) {
    return (
      changes.includes('not_started') ||
      changes.includes('completed') ||
      changes.includes('in_progress')
    );
  }

  removeTag(tag: string) {
    const index = this.checkboxArray.value.indexOf(tag);
    this.checkboxArray.removeAt(index);
  }

  clickOutside() {
    this.showDropdown = false;
  }

  emitNavigation($event: StageLessonNavigationEvent) {
    const { stageId, lessonId } = $event;

    const { accepted_agreement } = this.course.course_attempt.user_course;

    if (!accepted_agreement) {
      this.tcService
        .openTermsAndConditionsModal(
          this.course,
          TermsAgreementSubtitleText.START
        )
        .subscribe(bool => {
          if (bool) {
            this.navigate.next({ stageId, lessonId });
          }
        });
    } else {
      this.navigate.next({ stageId, lessonId });
    }
  }
}
