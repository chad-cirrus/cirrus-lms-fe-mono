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
    this.filterMenuSections = [
      { title: 'Status', items: ['completed', 'in_progress', 'not_started'] },
      { title: 'Stages', items: this.getStageTitles(this._stages) },
    ];
  }

  get stages() {
    return this._stages;
  }

  filterMenuSections!: FilterMenuSection[];

  lessonsDisplayedCount = 0;
  lessonsOverallCount = 0;
  showDropdown = true;

  @Output() navigate = new EventEmitter<StageLessonNavigationEvent>();

  filterForm = new FormGroup({
    filterText: new FormControl(null),
    filterCheckbox: new FormArray([]),
  });

  changes!: string[];

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
