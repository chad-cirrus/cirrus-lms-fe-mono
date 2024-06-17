import { Component, OnDestroy, OnInit } from '@angular/core';
import { CtcAdminService } from '../../app.service';
import { ITrainingCenter } from '../../models/ITrainingCenter';
import { Subscription } from 'rxjs';



export interface TableData {
  client: string;
  date: string;
  assessment: string;
  instructor: string;
  action: string;
}

const ELEMENT_DATA: TableData[] = [
  {
    client: "Terry Blandnesher",
    date: "2:15 PM",
    assessment: "Flight",
    instructor: "Cole Kneip",
    action: "",
  },
  {
    client: "Spencer Rysman",
    date: "Nov 11, 2022",
    assessment: "Ground",
    instructor: "Scott Mora",
    action: "remarks",
  },
  {
    client: "Willy Macintosh",
    date: "Nov 8, 2022",
    assessment: "Simulator",
    instructor: "Alexander Gomez",
    action: "remarks",
  }
];


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
  assessmentIcons: any;
  horizontal100Chart: any;
  displayedColumns: string[] = ['client', 'date', 'assessment', 'instructor', 'action'];
  dataSource = ELEMENT_DATA;
  private subscription: Subscription = new Subscription();

  /**
   * The subscription to the current training center data.
   */
  subscriptionTrainingCenter: Subscription = new Subscription();

  constructor(private ctcAdminService: CtcAdminService) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.subscriptionTrainingCenter = this.ctcAdminService.currentTrainingCenter.subscribe(data => {
      this.trainingCenter = data;
    });

    this.backgroundHeroImages = [
      {
        imagePath: 'ctc-admin/assets/images/ctc-dashboard-hero-background.jpg'
      }
    ]

    this.assessmentIcons = [
      {
        flight: 'ctc-admin/assets/icons/assessment-flight.svg',
        ground: 'ctc-admin/assets/icons/assessment-ground.svg',
        simulator: 'ctc-admin/assets/icons/assessment-simulator.svg',
      }
    ]

    this.horizontal100Chart = [
      {
        circleCheck: 'ctc-admin/assets/icons/circle-check.svg',
        circlePartial: 'ctc-admin/assets/icons/circle-partial.svg',
        circle: 'ctc-admin/assets/icons/circle.svg',
        circleMinus: 'ctc-admin/assets/icons/circle-minus.svg',
        flight: 'ctc-admin/assets/icons/assessment-flight.svg',
        ground: 'ctc-admin/assets/icons/assessment-ground.svg',
        simulator: 'ctc-admin/assets/icons/assessment-simulator.svg',
      }
    ]
  }

  /**
   * Cleans up resources when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.subscriptionTrainingCenter.unsubscribe();
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
    let _value = this.trainingCenter.cirrus_bucks?.balance;
    _value = _value && _value > 0 ? _value : 0;
    const formattedValue = _value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return formattedValue;
  }

}
