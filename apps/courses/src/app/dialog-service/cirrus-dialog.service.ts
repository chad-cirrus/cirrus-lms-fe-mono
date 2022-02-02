import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IContent, IPlayListItem } from '@cirrus/models';
import { of } from 'rxjs';
import { ContentPlayerComponent } from './content-player/content-player.component';
import { MediaContentDialogComponent } from './media-content-dialog/media-content-dialog.component';
import { ScormContentDialogComponent } from './scorm-content-dialog/scorm-content-dialog.component';

@Injectable()
export class CoursesDialogService {
  constructor(private dialog: MatDialog) {}

  displayMediaContent(playListItem: IPlayListItem) {
    return this.dialog.open(MediaContentDialogComponent, {
      data: {
        ...playListItem,
      },
    });
  }

  displayScormCotentDialog(playLastItem: IPlayListItem) {
    return this.dialog.open(ScormContentDialogComponent, {
      data: {
        ...playLastItem,
      },
    });
  }

  displayUnknownMedia(item: IPlayListItem) {
    return of('you got me unknown', item.title);
  }

  displayContentPlayerComponent(content: IContent) {
    return this.dialog.open(ContentPlayerComponent, {
      data: {
        content,
      },
    });
  }
}
