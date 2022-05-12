import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ILesson, ILessonFlightLog, ITask } from '@cirrus/models';
import { Observable } from 'rxjs';
import { ContentPlayerComponent } from './content-player/content-player.component';

@Injectable()
export class ContentPlayerDialogService {
  constructor(private dialog: MatDialog) {}

  displayContentPlayerComponent(lesson: ILesson, id: number, tasks?: ITask[], logbook?: ILessonFlightLog[]) {
    return this.dialog.open(ContentPlayerComponent, {
      data: {
        lesson,
        id,
        tasks,
        logbook
      },
      panelClass: 'fullscreen-dialog',
      height: '100vh',
      width: '100%',
    });
  }
}
