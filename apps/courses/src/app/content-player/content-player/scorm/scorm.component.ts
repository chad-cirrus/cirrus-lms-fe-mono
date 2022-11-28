/* eslint-disable @nrwl/nx/enforce-module-boundaries,@typescript-eslint/no-empty-function,@angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'apps/courses/src/environments/environment';
import { LessonContentComponent } from 'libs/ui/src/lib/LessonContentComponent';
import { MediaServerService } from '../../../media.service';
import { PROGRESS_STATUS } from '@cirrus/models';

@Component({
  selector: 'cirrus-scorm',
  templateUrl: './scorm.component.html',
  styleUrls: ['./scorm.component.scss'],
})
export class ScormComponent
  extends LessonContentComponent
  implements AfterViewInit
{
  @ViewChild('frame') frame: any;
  @ViewChild('wrapper', { static: true }) wrapper: any;
  complete = false;
  scorm_progress = '';
  url: any = '';
  api: any;
  loading = false;
  grade = 0;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private mediaServerService: MediaServerService
  ) {
    super();
    const $this = this;
    const route = this.router.url;
    this.api = {
      LMSInitialize: function () {
        this.data = {};
        this.data['cmi.core.lesson_status'] = 'not attempted';
        if (route === '/library') {
          this.data['cmi.suspend_data'] = '';
          return 'true';
        } else {
          return 'true';
        }
      },
      LMSFinish: function () {
        // console.log('LMS Finish');
        return 'true';
      },
      LMSGetValue: function (key: any) {
        // console.log('LMS Get Value');
        // window.console && console.log('LMSGetValue("' + key + '") - ' + this.data[key]);
        return this.data[key];
      },
      LMSSetValue: function (key: any, value: any) {
        // window.console && console.log('LMSSetValue("' + key + '") - ' + value);
        this.data[key] = value;

        if (key === 'cmi.suspend_data') {
          $this.hidePrevAndNext.emit(true);
        }

        if (key === 'cmi.core.score.raw') {
          $this.grade = +value;
        }

        if (key === 'cmi.core.lesson_status') {
          const id = $this.content.progress.id;
          const status =
            value === 'completed'
              ? PROGRESS_STATUS.completed
              : PROGRESS_STATUS.in_progress;

          const payload =
            value === 'completed'
              ? { id, status, scorm: { pass: true, grade: $this.grade } }
              : { id, status };

          $this.updateProgress.emit(payload);
        }

        return 'true';
      },
      LMSCommit: function () {
        // console.log('LMS Commit');
        return 'true';
      },
      LMSGetLastError: function () {
        // console.log('LMS Get Last Error');
        return 0;
      },
      LMSGetErrorString: function () {
        return 'Fake error string.';
      },
      LMSGetDiagnostic: function () {
        return 'Fake diagnostic information.';
      },
    };
  }

  // override base ngOnInit and ngOnDestroy
  ngOnInit() {}

  ngOnDestroy() {
    this.hidePrevAndNext.next(false);
  }

  ngAfterViewInit() {
    this.loading = true;
    const { blob_directory } = this.content || '';
    this.mediaServerService.scormStartingUrl(blob_directory).subscribe(
      url => {
        if (url) {
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
            `${environment.baseUrl}/${url.toString()}`
          );
          window['API' as string] = this.api;
        } else {
          this.url = null;
        }
        this.loading = false;
      },
      error => {
        this.url = null;
        console.log(error);
        this.loading = false;
      }
    );
  }
}
