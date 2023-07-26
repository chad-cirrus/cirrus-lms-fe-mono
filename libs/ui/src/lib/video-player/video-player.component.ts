import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { PROGRESS_STATUS } from '@cirrus/models';
import Player from '@vimeo/player';
import { LessonContentComponent } from '../LessonContentComponent';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cirrus-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent
  extends LessonContentComponent
  implements AfterViewInit, OnDestroy
{
  @ViewChild('cirrusvideoplayer', { static: false })
  cirrusvideoplayer!: ElementRef;

  ngAfterViewInit(): void {
    const content = this.content ? this.content : this.data;
    this.hidePrevAndNext.emit(false);
    const player = new Player(this.cirrusvideoplayer.nativeElement, {
      id: +content.url,
      responsive: true,
    });
    player.play();
    player.on('pause', () => {
      player.getCurrentTime().then(time => console.log(time));
    });
    player.on('ended', () => {
      if (this.content.progress) {
        this.updateProgress.emit({
          id: this.content.progress.id,
          status: PROGRESS_STATUS.completed,
        });
      }
    });
  }

  ngOnDestroy(): void {
    console.log('this content', this.content);
    if (this.content?.progress) {
      this.updateProgress.emit({
        id: this.content.progress.id,
        status: PROGRESS_STATUS.completed,
      });
    }
  }

  constructor(
    public dialogRef: MatDialogRef<VideoPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {
    super();
  }
}
