import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ICirrusUser } from '@cirrus/models';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, takeUntil } from 'rxjs/operators';
import { SidenavHeaderService } from '../sidenav-header.service';

@Component({
  selector: 'cirrus-global-side-nav',
  templateUrl: './global-side-nav.component.html',
  styleUrls: ['./global-side-nav.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class GlobalSideNavComponent implements OnInit, OnDestroy {
  destroyed = new Subject<void>();
  @Input() cirrusUser!: ICirrusUser;
  @Input() notificationCount!: number;
  @Input() deployUrl = '';

  collapse!: boolean;
  @Output() emitCollapse = new EventEmitter<boolean>();
  @Output() emitDismissHamburgerMenu = new EventEmitter<boolean>();
  @Output() toggleNotificationsMenu = new EventEmitter();

  disableToggle!: boolean;
  currentUrl = '';
  instructorStudentsUrl = 'instructor/dashboard';

  constructor(private breakpointObserver: BreakpointObserver, private sidenavService: SidenavHeaderService) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe('(max-width: 960px)')
      .pipe(
        takeUntil(this.destroyed),
        map(({ matches }) => {
          return matches;
        })
      )
      .subscribe(isTablet => {
        this.disableToggle = isTablet;
        this.toggleCollapse(isTablet);
      });

      this.sidenavService.isFeatureFlagEnabled('my_students')
        .subscribe(enabled => {
          if (enabled) {
            this.instructorStudentsUrl = 'students';
          }
        })
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  emitToggleNotificationsMenu() {
    // this.sidenavHeaderService.toggleShowNotifications();
    this.toggleNotificationsMenu.emit();
  }

  toggleCollapse(isTablet?: boolean) {
    isTablet === undefined
      ? (this.collapse = !this.collapse)
      : (this.collapse = isTablet);
    this.emitCollapse.emit(this.collapse);
  }
}
