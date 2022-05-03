import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IContentPlayerMenuItem } from '@cirrus/models';

@Component({
  selector: 'cirrus-lesson-content-player-menu',
  templateUrl: './lesson-content-player-menu.component.html',
  styleUrls: ['./lesson-content-player-menu.component.scss'],
})
export class LessonContentPlayerMenuComponent {
  leftChevron = 'courses/images/svg/LeftChevron.svg';
  @Output() closeMenu = new EventEmitter<void>();
  @Output() playContent = new EventEmitter<number>();

  @Input() menuItems!: IContentPlayerMenuItem[];

  close() {
    this.closeMenu.emit();
  }

  emitPlayContent(id: number) {
    this.playContent.emit(id);
  }
}
