import { Component, Input } from '@angular/core';
import { IProgress, ProgressType } from '@cirrus/models';

@Component({
  selector: 'cirrus-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.scss'],
})
export class ProgressCardComponent {
  @Input() progress: IProgress | undefined;

  get ProgressType() {
    return ProgressType;
  }

  mapProgressTypeToUrl(type: ProgressType): string {
    switch (type) {
      case ProgressType.Flight: {
        return 'images/svg/progress-icon-flight.svg';
      }
      case ProgressType.Ground: {
        return 'images/svg/progress-icon-ground.svg';
      }
      default: {
        return 'images/svg/progress-icon-land.svg';
      }
    }
  }
}
