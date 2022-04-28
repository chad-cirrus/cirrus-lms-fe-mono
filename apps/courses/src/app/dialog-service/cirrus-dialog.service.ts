import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IContent, ILesson } from '@cirrus/models';
import { of } from 'rxjs';
import { ContentPlayerComponent } from './content-player/content-player.component';
import { LessonContentPlayerComponent } from '@cirrus/ui';
import { MediaContentDialogComponent } from './media-content-dialog/media-content-dialog.component';

@Injectable()
export class CoursesDialogService {
  constructor(private dialog: MatDialog) {}

  displayMediaContent(content: IContent) {
    return this.dialog.open(MediaContentDialogComponent, {
      data: {
        ...content,
      },
    });
  }

  displayUnknownMedia(content: IContent) {
    return of('you got me unknown', content.title);
  }

  displayContentPlayerComponent(lesson: ILesson, content: IContent) {
    return this.dialog.open(LessonContentPlayerComponent, {
      data: {
        lesson,
        content,
      },
      panelClass: 'fullscreen-dialog',
      height: '100vh',
      width: '100%',
    });
  }
}
