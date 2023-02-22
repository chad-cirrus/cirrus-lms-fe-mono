import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cirrus-toggle-instructor-student',
  templateUrl: './toggle-instructor-student.component.html',
  styleUrls: ['./toggle-instructor-student.component.scss'],
})
export class ToggleInstructorStudentComponent implements OnInit {
  @Output() toggleViewEmit = new EventEmitter();
  @Input() activeName!: string;

  inactiveName!: string;

  view = true;

  ngOnInit(): void {
    this.inactiveName =
      this.activeName === 'Student' ? 'Instructor' : 'Student';
  }
  navigate() {
    this.toggleViewEmit.emit();
  }

  togglePanel(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.view = false;
  }

  dismissPanel() {
    this.view = true;
  }
}
