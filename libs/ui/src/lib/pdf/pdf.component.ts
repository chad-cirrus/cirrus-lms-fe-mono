import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LessonContentComponent } from '../LessonContentComponent';

@Component({
  selector: 'cirrus-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
})
export class PdfComponent extends LessonContentComponent implements OnInit {
  mobile$!: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.hidePrevAndNext.emit(false);
    super.ngOnInit();
    this.mobile$ = this.breakpointObserver.observe('(max-width: 600px)').pipe(
      map(({ matches }) => {
        return matches;
      })
    );
  }
}
