import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { PROGRESS_STATUS } from '@cirrus/models';
import Player from '@vimeo/player';
import { LessonContentComponent } from '../LessonContentComponent';

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
    const player = new Player(this.cirrusvideoplayer.nativeElement, {
      id: +this.content.url,
      responsive: true,
    });
    player.play();
    player.on('pause', () => {
      player.getCurrentTime().then(time => console.log(time));
    });
    player.on('ended', () => {

      if(this.content.progress) {
        this.updateProgress.emit({
          id: this.content.progress.id,
          status: PROGRESS_STATUS.completed,
        });
      }
    });
  }

  ngOnDestroy(): void {
    if(this.content.progress) {
      this.updateProgress.emit({
        id: this.content.progress.id,
        status: PROGRESS_STATUS.completed,
      });
    }
  }
}
