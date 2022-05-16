import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IContentPlayerMenuItem, PROGRESS_STATUS } from '@cirrus/models';
import { progressIconMapper } from '../helpers/ProgressIconMapper';

@Component({
  selector: 'cirrus-lesson-content-player-menu',
  templateUrl: './lesson-content-player-menu.component.html',
  styleUrls: ['./lesson-content-player-menu.component.scss'],
})
export class LessonContentPlayerMenuComponent {
  private _menuItems: IContentPlayerMenuItem[] = [];

  leftChevron = 'courses/images/svg/LeftChevron.svg';
  @Output() closeMenu = new EventEmitter<void>();
  @Output() playContent = new EventEmitter<number>();

  @Input()
  set menuItems(value: IContentPlayerMenuItem[]) {
    this._menuItems = value.map(item => ({
      ...item,
      icon:
        item.progress.status === PROGRESS_STATUS.not_started
          ? item.icon
          : progressIconMapper(item.progress.status),
    }));
  }

  get menuItems() {
    return this._menuItems;
  }

  close() {
    this.closeMenu.emit();
  }

  emitPlayContent(id: number) {
    this.playContent.emit(id);
  }
}
