/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { IPlayListItem } from '@cirrus/models';
import Player from '@vimeo/player';

@Component({
  selector: 'cirrus-media-content-dialog',
  templateUrl: './media-content-dialog.component.html',
  styleUrls: ['./media-content-dialog.component.scss'],
})
export class MediaContentDialogComponent implements AfterViewInit {
  @ViewChild('cirrusvideoplayer', { static: false })
  cirrusvideoplayer!: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IPlayListItem,
    public sanitizer: DomSanitizer
  ) {}

  ngAfterViewInit(): void {
    const player = new Player(this.cirrusvideoplayer.nativeElement, {
      id: +this.data.url!,
      responsive: true,
    });
    player.play();
    player.on('pause', () => {
      player.getCurrentTime().then(time => console.log(time));
    });
  }
}
