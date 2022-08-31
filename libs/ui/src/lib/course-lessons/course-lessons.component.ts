import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  Filter,
  FilterMenuSection,
  ICourseOverviewStage,
} from '@cirrus/models';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'cirrus-course-lessons',
  templateUrl: './course-lessons.component.html',
  styleUrls: ['./course-lessons.component.scss'],
})
export class CourseLessonsComponent implements OnInit {
  private _stages!: ICourseOverviewStage[];
  stagesSubject = new BehaviorSubject<ICourseOverviewStage[]>([]);

  filteredStages$!: Observable<ICourseOverviewStage[]>;

  @Input()
  set stages(value: ICourseOverviewStage[]) {
    this._stages = value;

    const combineTotalLessonsCount = value.map(stage => stage.lessons);
    this.lessonsOverallCount = this.findLessonCount(combineTotalLessonsCount);

    this.stagesSubject.next(value);
  }

  get stages() {
    return this._stages;
  }

  lessonsDisplayedCount!: number;
  lessonsOverallCount!: number;

  @Output() navigate = new EventEmitter<number>();
  showPanel$!: Observable<boolean>;

  filterForm = new FormGroup({
    filterText: new FormControl(''),
    filterCheckbox: new FormArray([]),
  });

  changes!: Filter;

  filterMenuSections: FilterMenuSection[] = [
    { title: 'Status', items: ['completed', 'in_progress', 'not_started'] },
    { title: 'Stages', items: ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'] },
  ];

  get checkboxArray() {
    return this.filterForm.get('filterCheckbox') as FormArray;
  }

  ngOnInit() {
    this.filteredStages$ = combineLatest([
      this.filterForm.valueChanges.pipe(
        startWith({ filterText: '', filterCheckbox: [] })
      ),
      this.stagesSubject,
    ]).pipe(
      map(([changes, stages]) => {
        this.changes = changes;
        return stages.filter(stage => this.filteredStages(changes, stage));
      }),
      map(stage =>
        stage.filter(stage => this.filteredBoxes(this.changes, stage))
      ),
      map(stage =>
        stage.filter(stage => this.filteredSearchInput(this.changes, stage))
      ),
      tap(stage => {
        const combineDisplayedLessons = stage.map(s => s.lessons);
        this.lessonsDisplayedCount = this.findLessonCount(
          combineDisplayedLessons
        );
      })
    );
  }

  findLessonCount(lessons: any) {
    return [].concat(...Object.keys(lessons).map(k => lessons[k])).length;
  }

  filteredStages(changes: Filter, stage: ICourseOverviewStage) {
    if (!changes.filterCheckbox.length) {
      return true;
    }
    if (changes.filterCheckbox.includes(`Stage ${stage.order + 1}`)) {
      return true;
    } else {
      return false;
    }
  }

  filteredBoxes(changes: Filter, stage: ICourseOverviewStage) {
    if (!changes.filterCheckbox.length) {
      return true;
    }
    if (this.isProgressFiltered(changes)) {
      return changes.filterCheckbox.includes(stage.progress.status);
    } else {
      return true;
    }
  }

  filteredSearchInput(changes: Filter, stage: ICourseOverviewStage) {
    if (!changes.filterText) {
      return true;
    } else {
      return stage.title.includes(changes.filterText);
    }
  }

  isProgressFiltered(changes: Filter) {
    return (
      changes.filterCheckbox.includes('not_started') ||
      changes.filterCheckbox.includes('completed') ||
      changes.filterCheckbox.includes('in_progress')
    );
  }

  removeTag(tag: string) {
    const index = this.checkboxArray.value.indexOf(tag);
    this.checkboxArray.removeAt(index);
  }

  emitNavigation(lessonId: number) {
    this.navigate.next(lessonId);
  }
}
