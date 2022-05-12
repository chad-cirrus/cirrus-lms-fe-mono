import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Attempt } from '@cirrus/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LessonContentComponent } from '../LessonContentComponent';

@Component({
  selector: 'cirrus-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AssessmentComponent extends LessonContentComponent implements OnInit {

  @ViewChild('tabs') tabGroup!: MatTabGroup;
  attempt!: Attempt;
  tablet$!: Observable<boolean>;
  mobile$!: Observable<boolean>;


  constructor(private breakpointObserver: BreakpointObserver) {super()}

  ngOnInit(): void {
    console.log('menu', this.menuOpen)
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
  }


  handleBack() {
    this.tabGroup.selectedIndex = 0;
  }

  handleEmitRow($event: Attempt) {
    this.tabGroup.selectedIndex = 2;
    this.attempt = $event;
  }


}
