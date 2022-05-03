import { Component, Input, OnInit } from '@angular/core';
import { LessonContentComponent } from '../LessonContentComponent';

@Component({
  selector: 'cirrus-download-content',
  templateUrl: './download-content.component.html',
  styleUrls: ['./download-content.component.scss'],
})
export class DownloadContentComponent extends LessonContentComponent {}
