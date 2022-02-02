/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cirrus-content-player',
  templateUrl: './content-player.component.html',
  styleUrls: ['./content-player.component.scss'],
})
export class ContentPlayerComponent implements OnInit {
  content: any;
  comments = false;
  showComments = false;
  showContent = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.content = this.data.content;
  }

  isFirstContentForLesson() {
    return this.data.lesson.contents.indexOf(this.content) === 0;
  }

  isLastContentForLesson() {
    return (
      this.data.lesson.contents.indexOf(this.content) ===
      this.data.lesson.contents.length - 1
    );
  }

  previousContent() {
    console.log(this.data);
  }

  nextContent() {
    console.log(this.data);
  }

  close() {
    //
  }
}
