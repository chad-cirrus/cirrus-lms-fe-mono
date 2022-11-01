import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ICirrusUser, ROLE } from '@cirrus/models';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'cirrus-global-user-menus',
  templateUrl: './global-user-menus.component.html',
  styleUrls: ['./global-user-menus.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class GlobalUserMenusComponent implements OnInit {
  @Input() cirrusImpersonationReturnUser!: ICirrusUser;
  @Output() displayPanel = new EventEmitter<any>();
  @Output() logout = new EventEmitter();
  @Output() impersonationLogout = new EventEmitter();

  isLeftVisible = true;
  showPanel$!: Observable<boolean>;
  private togglePanel = new BehaviorSubject(false);
  togglePanel$ = this.togglePanel.asObservable();

  @Input() isScreenSmall = false;

  private _cirrusUser!: ICirrusUser;
  showDashboard = false;
  showCTCDashboard = false;
  showLMSDashboard = false;

  @Input()
  set cirrusUser(value: ICirrusUser) {
    this._cirrusUser = value;
    this.showDashboard =
      value &&
      (value.ctc_admin ||
        value.role === ROLE.admin ||
        value.role === ROLE.super_admin);
    this.showCTCDashboard =
      this.cirrusUser.ctc_admin ||
      this.cirrusUser.role === ROLE.admin ||
      this.cirrusUser.role === ROLE.super_admin;
    this.showLMSDashboard =
      this.cirrusUser.role === ROLE.admin ||
      this.cirrusUser.role === ROLE.super_admin;
  }

  get cirrusUser() {
    return this._cirrusUser;
  }

  pilot!: boolean;
  ctcAdmin!: boolean;
  admin!: boolean;

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
    this.togglePanel.next(!this.togglePanel.value);
    this.displayPanel.emit(this.showPanel$);
  }

  emitLogout() {
    this.logout.emit();
  }

  emitImpersonationLogout() {
    this.impersonationLogout.emit();
  }
}
