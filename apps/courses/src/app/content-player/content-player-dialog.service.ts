import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IContent, ILesson, ILessonFlightLog, ITask } from '@cirrus/models';
import { ContentPlayerComponent } from './content-player/content-player.component';

@Injectable()
export class ContentPlayerDialogService {
  constructor(private dialog: MatDialog) {}

  displayContentPlayerComponent(
    lesson: ILesson,
    id: number,
    tasks?: ITask[],
    logbook?: ILessonFlightLog[],
    content?: IContent,
    overview?: string
  ) {
    return this.dialog.open(ContentPlayerComponent, {
      data: {
        lesson,
        id,
        tasks,
        logbook,
        content,
        overview,
      },
      panelClass: 'fullscreen-dialog',
      height: '100%',
      width: '100%',
    });
  }
}
