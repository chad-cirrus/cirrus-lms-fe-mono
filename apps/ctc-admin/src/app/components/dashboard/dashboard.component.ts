import { Component, OnDestroy, OnInit } from '@angular/core';
import { CtcAdminService } from '../../app.service';
import { ITrainingCenter } from '../../models/ITrainingCenter';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  title = 'CTC Dashboard';
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
