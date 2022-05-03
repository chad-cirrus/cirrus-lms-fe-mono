import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IContentPlayerMenuItem, ILesson } from '@cirrus/models';
import { BehaviorSubject } from 'rxjs';
import { DownloadContentComponent } from '../download-content/download-content.component';
import { mapContentTypeToIcon } from '../helpers/ContentTypeToIconMapper';
import { PlaceholderDirective } from '../helpers/Placeholder.directive';
import { VideoPlayerComponent } from '../video-player/video-player.component';

@Component({
  selector: 'cirrus-lesson-content-player',
  templateUrl: './lesson-content-player.component.html',
  styleUrls: ['./lesson-content-player.component.scss'],
})
export class LessonContentPlayerComponent implements OnInit, AfterViewInit {
  menuIcon = 'courses/images/svg/LcpMenuIcon.svg';
  closeIcon = 'courses/images/svg/content-player-close.svg';
  private _menuOpen = new BehaviorSubject<boolean>(false);
  menuOpen$ = this._menuOpen.asObservable();
  menuItems!: IContentPlayerMenuItem[];
  title!: string;
  subtitle!: string;
  id!: number;

  @ViewChild(PlaceholderDirective) vcref!: PlaceholderDirective;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      lesson: ILesson;
    }
  ) {}

  ngOnInit(): void {
    this.menuItems = this.data.lesson.contents.map(c => ({
      icon: mapContentTypeToIcon(c.content_type),
      text: c.title,
      id: c.id,
    }));
  }

  ngAfterViewInit(): void {
    console.log('mmmm');
    setTimeout(() => {
      this.playContent(this.data.id);
    }, 100);
  }

  toggleMenu() {
    this._menuOpen.next(true);
  }

  handleCloseMenu() {
    this._menuOpen.next(false);
  }

  previousContent() {
    const previousIndex = this.menuItems.map(i => i.id).indexOf(this.id) - 1;
    if (previousIndex > -1) {
      this.playContent(this.menuItems[previousIndex].id);
    }
  }

  nextContent() {
    const nextIndex = this.menuItems.map(i => i.id).indexOf(this.id) + 1;
    if (nextIndex !== this.menuItems.length) {
      this.playContent(this.menuItems[nextIndex].id);
    }
  }

  playContent(id: number) {
    this.vcref.ViewContainerRef.clear();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const content = this.data.lesson.contents.find(c => c.id === id)!;
    this.id = content.id;
    this.title = content.title;
    this.subtitle = content.subtitle;

    let componentRef;
    switch (content?.content_type) {
      case 6: {
        componentRef = this.vcref.ViewContainerRef.createComponent(
          DownloadContentComponent
        );
        const downloadContentComponent = componentRef.instance;
        downloadContentComponent.content = content;
        break;
      }
      default: {
        componentRef =
          this.vcref.ViewContainerRef.createComponent(VideoPlayerComponent);
        const videplayer = componentRef.instance;
        videplayer.content = content;
      }
    }
  }

  close() {
    console.log('close');
  }
}
