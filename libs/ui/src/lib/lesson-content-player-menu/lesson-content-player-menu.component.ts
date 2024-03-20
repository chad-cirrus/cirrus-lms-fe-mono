import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { IContentPlayerMenuItem, PROGRESS_STATUS } from '@cirrus/models';
import { progressIconMapper } from '../helpers/ProgressIconMapper';

@Component({
  selector: 'cirrus-lesson-content-player-menu',
  templateUrl: './lesson-content-player-menu.component.html',
  styleUrls: ['./lesson-content-player-menu.component.scss'],
})
export class LessonContentPlayerMenuComponent implements OnInit {
  private _menuItems: IContentPlayerMenuItem[] = [];

  leftChevron = 'courses/images/svg/desktop-sn-l-chevron.svg';
  downChevron = 'courses/images/svg/down-chevron.svg';
  menuIcon = 'courses/images/svg/lesson-icon-heavy.svg';
  isMobile = false;
  @Output() closeMenu = new EventEmitter<void>();
  @Output() playContent = new EventEmitter<number>();

  @Input()
  set menuItems(value: IContentPlayerMenuItem[]) {
    this._menuItems = value.map(item => ({
      ...item,
      icon:
        item.progress === null || item.progress?.status === PROGRESS_STATUS.not_started
          ? item.icon
          : progressIconMapper(item.progress.status),
    }));
  }

  get menuItems() {
    return this._menuItems;
  }

  ngOnInit(): void {
    //Check device resolution
    window.innerWidth <= 959 ? this.isMobile = true : this.isMobile = false
    window.onresize = () => this.isMobile = window.innerWidth <= 959;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    event <= 959 ? this.isMobile = true : this.isMobile = false;
  }

  close() {
    this.closeMenu.emit();
  }

  emitPlayContent(id: number) {
    this.playContent.emit(id);
    if (this.isMobile) {
      this.close();
    }
  }
}
