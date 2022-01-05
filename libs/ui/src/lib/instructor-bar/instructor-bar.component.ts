import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cirrus-instructor-bar',
  templateUrl: './instructor-bar.component.html',
  styleUrls: ['./instructor-bar.component.scss'],
})
export class InstructorBarComponent implements OnInit, OnDestroy {
  student = 'John Doe';
  viewToggle = new FormControl(false);
  toggle$ = this.viewToggle.valueChanges;
  subscription = new Subscription();
  @Output() instructorView = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.subscription.add(
      this.toggle$.subscribe((instructor: boolean) =>
        this.instructorView.next(instructor)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
