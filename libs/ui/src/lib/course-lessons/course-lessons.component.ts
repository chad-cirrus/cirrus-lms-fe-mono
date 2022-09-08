import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  FilterMenuSection,
  ICourseOverviewLesson,
  ICourseOverviewStage,
} from '@cirrus/models';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

import { debounceTime, map, startWith, tap } from 'rxjs/operators';
import { StageLessonNavigationEvent } from '../StageLessonNavigationEvent';


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
  filteredLessons$!: Observable<ICourseOverviewLesson[]>;

  @Input()
  set stages(value: ICourseOverviewStage[]) {
    this._stages = value;
    const combineTotalLessonsCount = value.map(stage => stage.lessons);
    const combine = this.combineLessons(combineTotalLessonsCount);
    this.lessonsOverallCount = combine.length;
    this.stagesSubject.next(value);
    this.lessonsSubject.next(combine);
  }

  get stages() {
    return this._stages;
  }

  lessonsDisplayedCount!: number;
  lessonsOverallCount!: number;
  showDropdown = true;

  @Output() navigate = new EventEmitter<StageLessonNavigationEvent>();

  filterForm = new FormGroup({
    filterText: new FormControl(null),
    filterCheckbox: new FormArray([]),
  });

  changes!: string[];

  filterMenuSections: FilterMenuSection[] = [
    { title: 'Status', items: ['completed', 'in_progress', 'not_started'] },
    { title: 'Stages', items: ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'] },
  ];

  get array() {
    return this.filterForm.get('filterCheckbox');
  }

  get checkboxArray() {
    return this.filterForm.get('filterCheckbox') as FormArray;
  }

  get filterText() {
    return this.filterForm.get('filterText');
  }

  ngOnInit() {
    this.filteredStages$ = combineLatest([
      this.checkboxArray.valueChanges.pipe(startWith([])),
      this.stagesSubject,
    ]).pipe(
      map(([changes, stages]) => {
        this.changes = changes;
        return stages.filter(stage => this.filteredStages(changes, stage));
      }),
      map(stage =>
        stage.filter(stage => this.filteredBoxes(this.changes, stage))
      ),
      tap(stage => {
        const combineDisplayedLessons = stage.map(s => s.lessons);
        this.lessonsDisplayedCount = this.combineLessons(
          combineDisplayedLessons
        ).length;
      })
    );

    this.filteredLessons$ = combineLatest([
      this.filterForm.valueChanges.pipe(
        startWith({ filterText: this.filterText?.value })
      ),
      this.lessonsSubject,
    ]).pipe(
      debounceTime(200),
      map(([changes, lessons]) => {
        this.showDropdown = true;
        if (this.filterText?.value) {
          this.showDropdown = true;
        }
        return !changes.filterText
          ? []
          : lessons.filter(l => {
              const format = l.progress.status.replace('_', ' ');
              return (
                l.title
                  .toLowerCase()
                  .includes(changes.filterText.toLowerCase()) ||
                format.toLowerCase().includes(changes.filterText.toLowerCase())
              );
            });
      })
    );
  }

  combineLessons(lessons: any) {
    return [].concat(...Object.keys(lessons).map(k => lessons[k]));
  }

  filteredStages(changes: any, stage: ICourseOverviewStage) {
    const stageStringMatch =
      changes.filter((item: string) => item.includes('Stage')) > -1;

    if (!changes.length || stageStringMatch) {
      return true;
    }
    if (changes.includes(`Stage ${stage.order + 1}`)) {
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

  emitNavigation({ stageId, lessonId }: StageLessonNavigationEvent) {
    this.navigate.next({ stageId, lessonId });

  }
}
