import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IContent, ILesson } from '@cirrus/models';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'cirrus-lesson-content-player',
  templateUrl: './lesson-content-player.component.html',
  styleUrls: ['./lesson-content-player.component.scss'],
})
export class LessonContentPlayerComponent implements OnInit, OnDestroy {
  menuIcon = 'courses/images/svg/LcpMenuIcon.svg';
  closeIcon = 'courses/images/svg/content-player-close.svg';
  private _menuOpen = new BehaviorSubject<boolean>(false);
  menuOpen$ = this._menuOpen.asObservable();
  subscription = new Subscription();
  // todo: refactor this placeholder data
  menuItems = [
    {
      icon: 'courses/images/svg/assessment_lc_icon.svg',
      text: 'Intro',
    },
    {
      icon: 'courses/images/svg/video_play.svg',
      text: 'Review Lesson Objective',
    },
    {
      icon: 'courses/images/svg/quiz_lc_icon.svg',
      text: 'Completion Standards',
    },
    {
      icon: 'courses/images/svg/video_play.svg',
      text: 'Preflight Planning and Preparation',
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      content: IContent;
      lesson: ILesson;
    }
  ) {}

  ngOnInit(): void {
    this.subscription.add(this.menuOpen$.subscribe(console.log));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleMenu() {
    this._menuOpen.next(true);
  }

  handleCloseMenu() {
    this._menuOpen.next(false);
  }

  previousContent() {
    //
  }

  nextContent() {
    //
  }

  close() {
    console.log('close');
  }
}
