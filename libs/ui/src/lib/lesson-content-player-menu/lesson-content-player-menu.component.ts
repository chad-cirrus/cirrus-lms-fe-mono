import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface IMenuItem {
  icon: string;
  text: string;
}

@Component({
  selector: 'cirrus-lesson-content-player-menu',
  templateUrl: './lesson-content-player-menu.component.html',
  styleUrls: ['./lesson-content-player-menu.component.scss'],
})
export class LessonContentPlayerMenuComponent implements OnInit {
  leftChevron = 'courses/images/svg/LeftChevron.svg';
  @Output() closeMenu = new EventEmitter<void>();

  @Input() menuItems!: IMenuItem[];

  ngOnInit(): void {
    console.log('wait for it');
  }

  close() {
    this.closeMenu.emit();
  }
}
