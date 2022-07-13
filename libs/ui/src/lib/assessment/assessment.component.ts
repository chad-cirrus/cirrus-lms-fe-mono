import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ViewEncapsulation,
  ViewChild,
  OnInit,
  Input,
} from '@angular/core';
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

  constructor(private breakpointObserver: BreakpointObserver) {
    super();
  }

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
