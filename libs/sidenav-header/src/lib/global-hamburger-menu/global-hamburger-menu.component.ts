import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ICirrusUser } from '@cirrus/models';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'cirrus-global-hamburger-menu',
  templateUrl: './global-hamburger-menu.component.html',
  styleUrls: ['./global-hamburger-menu.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class GlobalHamburgerMenuComponent implements OnInit {
  @Input() cirrusUser!: ICirrusUser;
  @Output() displayHamburger = new EventEmitter<any>();
  @Input() notificationCount!: number;
  isLeftVisible = true;
  showPanel$!: Observable<boolean>;
  private togglePanel = new BehaviorSubject(false);
  togglePanel$ = this.togglePanel.asObservable();

  @ViewChild(CdkConnectedOverlay, { static: true })
  private connectedOverlay!: CdkConnectedOverlay;

  private isPanelHidden$!: Observable<boolean>;

  ngOnInit(): void {
    this.isPanelHidden$ = this.connectedOverlay.backdropClick.pipe(
      map(() => false),
      tap(() => this.togglePanel.next(false))
    );
    this.showPanel$ = merge(this.togglePanel$, this.isPanelHidden$);
  }

  toggleMenu() {
    console.log('toggle menu');
    this.togglePanel.next(!this.togglePanel.value);
    this.displayHamburger.emit(this.showPanel$);
  }
}
