import { Component, Input, OnInit } from '@angular/core';
import { ILessonFlightLog } from '@cirrus/models';

@Component({
  selector: 'cirrus-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.scss']
})
export class LogbookComponent {

  @Input() logbook!: ILessonFlightLog[];



}
