import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Player from '@vimeo/player';
import { LessonContentComponent } from '../LessonContentComponent';

@Component({
  selector: 'cirrus-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent
  extends LessonContentComponent
  implements AfterViewInit
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
  }
}
