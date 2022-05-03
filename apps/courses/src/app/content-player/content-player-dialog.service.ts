import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ILesson } from '@cirrus/models';
import { ContentPlayerComponent } from './content-player/content-player.component';

@Injectable()
export class ContentPlayerDialogService {
  constructor(private dialog: MatDialog) {}

  displayContentPlayerComponent(lesson: ILesson, id: number) {
    return this.dialog.open(ContentPlayerComponent, {
      data: {
        lesson,
        id,
      },
      panelClass: 'fullscreen-dialog',
      height: '100vh',
      width: '100%',
    });
  }
}
