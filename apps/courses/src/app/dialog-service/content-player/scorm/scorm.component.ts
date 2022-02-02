/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  SecurityContext,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IContent, ILesson } from '@cirrus/models';
import { environment } from 'apps/courses/src/environments/environment';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MediaServerService } from '../../../media.service';

@Component({
  selector: 'cirrus-scorm',
  templateUrl: './scorm.component.html',
  styleUrls: ['./scorm.component.scss'],
})
export class ScormComponent implements AfterViewInit {
  @Input() content!: IContent;
  @Input() lesson!: ILesson;
  @Input() lesson_id!: number;
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
    const route = this.router.url;
    this.api = {
      LMSInitialize: function () {
        this.data = {};
        this.data['cmi.core.lesson_status'] = 'not attempted';
        if (route === '/library') {
          this.data['cmi.suspend_data'] = '';
          return 'true';
        } else {
          // if (progressItem.length && progressItem[0] && progressItem[0].scorm_progress) {
          // if (progressItem[0].scorm_progress.includes('_isComplete')) {
          // this.data['cmi.suspend_data'] = progressItem[0].scorm_progress;
          // } else {
          // this.data['cmi.suspend_data'] = progressItem[0].scorm_progress.replace(/"/g, '');
          // }
          // } else {
          this.data['cmi.suspend_data'] = '';
          // }
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
    console.log('Route: ', 'scorm.component.ts');
    window['API' as string] = this.api;
    this.loading = true;
    const { blob_directory } = this.content || '';
    this.mediaServerService
      .scormStartingUrl(blob_directory)
      .pipe(
        catchError(err => {
          this.url = null;
          console.log(err);
          this.loading = false;

          return of('');
        })
      )
      .subscribe(url => {
        if (url) {
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
            `${environment.baseUrl}/${url.toString()}`
          );
          console.log('this.url: ', this.url);
        } else {
          this.url = null;
        }
        this.loading = false;
      });
  }
}
