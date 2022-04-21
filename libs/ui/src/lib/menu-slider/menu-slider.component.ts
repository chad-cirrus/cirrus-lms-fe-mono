import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';


type PaneType = 'left' | 'right';


@Component({
  selector: 'cirrus-menu-slider',
  templateUrl: './menu-slider.component.html',
  styleUrls: ['./menu-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300))
    ]),
    trigger('slide-from-top', [
      state('top', style({ transform: 'translateX(0)' })),
      state('bottom', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(3000))
    ]),
  ]
})
export class MenuSliderComponent  {
  @Input() type!: string;
  @Input() activePane: PaneType = 'left';


}
