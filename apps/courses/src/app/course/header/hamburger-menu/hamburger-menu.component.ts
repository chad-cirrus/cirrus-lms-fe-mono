import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ICirrusUser } from '@cirrus/models';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'cirrus-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent implements OnInit {
  @Input() cirrusUser!: ICirrusUser
  @Output() displayHamburger = new EventEmitter<any>();

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
    this.togglePanel.next(!this.togglePanel.value);
    this.displayHamburger.emit(this.showPanel$)

  }


}
