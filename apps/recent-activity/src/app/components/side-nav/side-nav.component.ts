import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ICirrusUser } from '@cirrus/models';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'cirrus-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
  destroyed = new Subject<void>();
  @Input() cirrusUser!: ICirrusUser;
  @Input() type = '';
  @Input() notificationCount!: number;
  collapse!: boolean;
  @Output() emitCollapse = new EventEmitter<boolean>();
  @Output() emitDismissHamburgerMenu = new EventEmitter<boolean>();

  disableToggle!: boolean;
  currentUrl = '';

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe('(max-width: 950px)')
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
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  get formatBadge() {
    if (this.notificationCount) {
      return this.notificationCount > 99 ? '99+' : this.notificationCount;
    }
    return '';
  }

  dismissHamburgerMenu() {
    this.emitDismissHamburgerMenu.emit();
  }

  toggleCollapse(isTablet?: boolean) {
    isTablet === undefined
      ? (this.collapse = !this.collapse)
      : (this.collapse = isTablet);
    this.emitCollapse.emit(this.collapse);
  }
}
