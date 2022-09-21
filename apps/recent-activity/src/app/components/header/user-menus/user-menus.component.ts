import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ICirrusUser } from '@cirrus/models';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsScreenSmall } from '../../../store/selectors/view.selector';
import { AppState } from '../../../store/reducers';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'cirrus-user-menus',
  templateUrl: './user-menus.component.html',
  styleUrls: ['./user-menus.component.scss'],
})
export class UserMenusComponent implements OnInit {
  @Input() cirrusImpersonationReturnUser!: ICirrusUser;
  @Output() displayPanel = new EventEmitter<any>();
  isLeftVisible = true;
  showPanel$!: Observable<boolean>;
  private togglePanel = new BehaviorSubject(false);
  togglePanel$ = this.togglePanel.asObservable();

  isScreenSmall$: Observable<boolean> = this.store
    .select(selectIsScreenSmall)
    .pipe(tap(value => console.log('is screen small', value)));

  private _cirrusUser!: ICirrusUser;
  showDashboard = false;
  showCTCDashboard = false;
  showLMSDashboard = false;

  @Input()
  set cirrusUser(value: ICirrusUser) {
    this._cirrusUser = value;
    this.showDashboard = value && (value.ctc_admin || value.role === 'admin');
    this.showCTCDashboard =
      this.cirrusUser.ctc_admin || this.cirrusUser.role === 'admin';
    this.showLMSDashboard = this.cirrusUser.role === 'admin';
  }

  get cirrusUser() {
    return this._cirrusUser;
  }

  pilot!: boolean;
  ctcAdmin!: boolean;
  admin!: boolean;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>
  ) {}

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

  logout() {
    this.userService.logout().subscribe(user => {
      window.location.href = 'https://cirrusapproach.com';
    });
  }

  impersonationLogout() {
    localStorage.setItem(
      'cirrus-token',
      localStorage.getItem('cirrus-impersonation-return') ?? ''
    );
    localStorage.setItem(
      'cirrus-user',
      localStorage.getItem('cirrus-impersonation-return-user') ?? ''
    );
    localStorage.setItem(
      'cirrus-role',
      localStorage.getItem('cirrus-impersonation-return-role') ?? ''
    );

    localStorage.removeItem('cirrus-impersonation-return-role');
    localStorage.removeItem('cirrus-impersonation-return');
    localStorage.removeItem('cirrus-impersonation-return-user');

    this.router.navigate(['admin']);
  }
}
