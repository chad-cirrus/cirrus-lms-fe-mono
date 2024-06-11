import { Component } from '@angular/core';
import { ITrainingCenter } from '../../models/ITrainingCenter';
import { Subscription } from 'rxjs';
import { CtcAdminService } from '../../app.service';

@Component({
  selector: 'app-ctc-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
})
export class ActivityComponent {
  title = 'CTC Activity';
  trainingCenter: ITrainingCenter = {} as ITrainingCenter;
  private subscription: Subscription = new Subscription();

  constructor(private ctcAdminService: CtcAdminService) {}

  ngOnInit(): void {
    this.subscription = this.ctcAdminService.currentTrainingCenter.subscribe(data => {
      this.trainingCenter = data;
    });
  }
  ngoOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
