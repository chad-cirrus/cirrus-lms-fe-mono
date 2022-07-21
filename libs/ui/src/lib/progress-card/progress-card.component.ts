import { Component, Input } from '@angular/core';
import { ProgressStat, ProgressType } from '@cirrus/models';

export interface IProgressView {
  text: string;
  imageIcon: string;
}

@Component({
  selector: 'cirrus-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.scss'],
})
export class ProgressCardComponent {
  private _text!: string;
  private _imageIcon!: string;
  private _completed!: number;
  private _total!: number | undefined;

  get text() {
    return this._text;
  }

  get imageIcon() {
    return this._imageIcon;
  }

  get completed() {
    return this._completed;
  }

  get total() {
    return this._total;
  }

  @Input()
  set progress({ type, completed, total }: ProgressStat) {
    const progressType = ProgressCardComponent.progressTypeDictionary[type];
    this._text = progressType.text;
    this._imageIcon = progressType.imageIcon;
    this._completed = completed;
    this._total = total;

  }

  private static progressTypeDictionary: { [key: string]: IProgressView } = {
    [ProgressType.Flight]: {
      text: 'Flight Hrs',
      imageIcon: 'courses/images/svg/flight-hours-icon.svg',
    },
    [ProgressType.Ground]: {
      text: 'Ground Hrs',
      imageIcon: 'courses/images/svg/ground-hours-icon.svg',
    },
    [ProgressType.CrossCountry]: {
      text: 'Cross Country Hrs',
      imageIcon: 'courses/images/svg/cross-country-icon.svg',
    },
    [ProgressType.Simulator]: {
      text: 'Simulator Hrs',
      imageIcon: 'courses/images/svg/simulator_icon.svg',
    },
    [ProgressType.Landings]: {
      text: 'Landings',
      imageIcon: 'courses/images/svg/landing_hours_icon.svg',
    },
    [ProgressType.Assessment]: {
      text: 'Assessment Tasks',
      imageIcon: 'courses/images/svg/assessment_icon.svg',
    },
    [ProgressType.SelfStudy]: {
      text: 'Self Study',
      imageIcon: 'courses/images/svg/self-study.svg',
    },
  };
}
