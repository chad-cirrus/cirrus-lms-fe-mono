import { Component, Input } from '@angular/core';
import { IProgress, ProgressType } from '@cirrus/models';

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
  private _completedCourses!: number;
  private _totalCourses!: number;

  get text() {
    return this._text;
  }

  get imageIcon() {
    return this._imageIcon;
  }

  get completedCourses() {
    return this._completedCourses;
  }

  get totalCourses() {
    return this._totalCourses;
  }

  @Input()
  set progress(progress: IProgress) {
    this._text = this.mapProgressTypeToUrl(progress.type).text;
    this._imageIcon = this.mapProgressTypeToUrl(progress.type).imageIcon;
    this._completedCourses = progress.completedCourses;
    this._totalCourses = progress.totalCourses;
  }

  mapProgressTypeToUrl(type: ProgressType): IProgressView {
    const view: IProgressView = { text: '', imageIcon: '' };
    switch (type) {
      case ProgressType.Flight: {
        view.text = 'Flight Hrs';
        view.imageIcon = 'courses/images/svg/flight-hours-icon.svg';
        return view;
      }
      case ProgressType.Ground: {
        view.text = 'Ground Hrs';
        view.imageIcon = 'courses/images/svg/ground-hours-icon.svg';
        return view;
      }
      case ProgressType.Simulator: {
        view.text = 'Simulator Hrs';
        view.imageIcon = 'courses/images/svg/simulator_icon.svg';
        return view;
      }
      case ProgressType.Landings: {
        view.text = 'Landings';
        view.imageIcon = 'courses/images/svg/landing_hours_icon.svg';
        return view;
      }
      case ProgressType.SelfStudy: {
        view.text = 'Self Study';
        view.imageIcon = 'courses/images/svg/self-study.svg';
        return view;
      }
      default: {
        view.text = 'Assessment Tasks';
        view.imageIcon = 'courses/images/svg/assessment_icon.svg';
        return view;
      }
    }
  }
}
