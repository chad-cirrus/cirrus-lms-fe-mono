import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IContent } from '@cirrus/models';
import { ContentPlayerComponent } from './content-player/content-player.component';

export interface IContentPlayerData {
  id: number;
  overview: string;
  intro: boolean;
  content?: IContent;
}

@Injectable()
export class ContentPlayerDialogService {
  constructor(private dialog: MatDialog) {}

  displayContentPlayerBComponent(
    id: number,
    overview = '',
    intro = false,
    content?: IContent
  ) {
    return this.dialog.open(ContentPlayerComponent, {
      data: {
        id,
        overview,
        intro,
        content,
      },
      panelClass: 'fullscreen-dialog',
      height: '100%',
      width: '100%',
    });
  }
}
