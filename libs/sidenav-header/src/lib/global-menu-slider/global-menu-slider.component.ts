import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

type PaneType = 'left' | 'right';

@Component({
  selector: 'cirrus-global-menu-slider',
  templateUrl: './global-menu-slider.component.html',
  styleUrls: ['./global-menu-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300)),
    ]),
    trigger('slide-from-top', [
      state('top', style({ transform: 'translateX(0)' })),
      state('bottom', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300)),
    ]),
  ],
})
export class GlobalMenuSliderComponent {
  @Input() type!: string;
  @Input() activePane: PaneType = 'left';
}
