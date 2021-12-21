import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPlayListItem } from '@cirrus/models';
import { MediaContentDialogComponent } from './media-content-dialog/media-content-dialog.component';

@Injectable()
export class CoursesDialogService {
  constructor(private dialog: MatDialog) {}

  displayMediaContent({ id, url, title, contentTitle }: IPlayListItem) {
    return this.dialog.open(MediaContentDialogComponent, {
      data: {
        id,
        url,
        title,
        contentTitle,
      },
    });
  }
}
