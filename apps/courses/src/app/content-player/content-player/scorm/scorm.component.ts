/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'apps/courses/src/environments/environment';
import { LessonContentComponent } from 'libs/ui/src/lib/LessonContentComponent';
import { MediaServerService } from '../../../media.service';

@Component({
  selector: 'cirrus-scorm',
  templateUrl: './scorm.component.html',
  styleUrls: ['./scorm.component.scss'],
})
export class ScormComponent
  extends LessonContentComponent
  implements AfterViewInit
{
  @Output() create_scorm: EventEmitter<any> = new EventEmitter<any>();
  @Output() update_scorm: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('frame') frame: any;
  @ViewChild('wrapper', { static: true }) wrapper: any;
  complete = false;
  scorm_progress = '';
  url: any = '';
  api: any;
  loading = false;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private mediaServerService: MediaServerService
  ) {
    super();
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
          let newValue = null;
          try {
            newValue = JSON.parse(value);
          } catch (e) {
            newValue = value;
          }
          this.scorm_progress = newValue;
          if (newValue && newValue._isComplete) {
            this.create_scorm.emit({ status: 2, scorm_progress: newValue });
          } else if (newValue && newValue._progress === 100) {
            this.update_scorm.emit({ status: 2, scorm_progress: newValue });
          } else if (newValue) {
            if (this.complete) {
              return;
            }
            this.update_scorm.emit({ status: 1, scorm_progress: newValue });
          }
        } else if (key === 'cmi.core.lesson_status') {
          if (value === 'completed') {
            this.complete = true;
            this.update_scorm.emit({
              status: 2,
              scorm_progress: this.scorm_progress,
            });
          }
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
