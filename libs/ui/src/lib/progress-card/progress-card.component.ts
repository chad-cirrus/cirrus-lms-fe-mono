import { Component, Input, OnInit } from '@angular/core';
import { IProgress, ProgressType } from '@cirrus/models';

@Component({
  selector: 'cirrus-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.scss'],
})
export class ProgressCardComponent implements OnInit {
  @Input() progress: IProgress | undefined;

  get ProgressType() {
    return ProgressType;
  }

  constructor() {}

  ngOnInit(): void {}

  mapProgressTypeToUrl(type: ProgressType): string {
    switch (type) {
      case ProgressType.Flight: {
        return '/assets/ui/images/progress-flight.png';
      }
      case ProgressType.Ground: {
        return '/assets/ui/images/progress-ground.png';
      }
      default: {
        return '/assets/ui/images/progress-land.png';
      }
    }
  }
}
