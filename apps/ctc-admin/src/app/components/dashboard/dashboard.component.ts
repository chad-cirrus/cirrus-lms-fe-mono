import { Component, OnDestroy, OnInit } from '@angular/core';
import { CtcAdminService } from '../../app.service';
import { ITrainingCenter } from '../../models/ITrainingCenter';
import { Subscription } from 'rxjs';

/**
 * Represents the dashboard component of the application.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  /**
   * The title of the dashboard.
   */
  title = 'CTC Dashboard';

  /**
   * The training center data.
   */
  trainingCenter: ITrainingCenter = {} as ITrainingCenter;

  /**
   * The background hero images.
   */
  backgroundHeroImages: any;

  /**
   * The subscription to the current training center data.
   */
  subscription: Subscription = new Subscription();

  constructor(private ctcAdminService: CtcAdminService) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.subscription = this.ctcAdminService.currentTrainingCenter.subscribe(data => {
      this.trainingCenter = data;
    });

    this.backgroundHeroImages = [
      {
        imagePath: 'ctc-admin/assets/images/ctc-dashboard-hero-background.jpg',
      },
    ];
  }

  /**
   * Cleans up resources when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Returns the formatted date.
   */
  getFormattedDate(): string {
    const _currentDate = new Date();

    return _currentDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
  getFormattedCirrusBucks(): string {
    const _value = this.trainingCenter.cirrus_bucks.balance;
    const formattedValue = _value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return formattedValue;
  }
}
