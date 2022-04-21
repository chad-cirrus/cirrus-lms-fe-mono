import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ICirrusUser } from '@cirrus/models';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'cirrus-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() cirrusUser!: ICirrusUser;
  @Input() type?: string;
  @Input() notificationCount!: number;
  collapse!: boolean;
  @Output() emitCollapse = new EventEmitter<boolean>();
  isScreenTablet$!: any;
  disableToggle!: boolean;
  currentUrl = '';


  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.currentUrl = event['url'].slice(9, event['url'].length);
      });
  }

  ngOnInit(): void {
    this.isScreenTablet$ = this.breakpointObserver
      .observe('(max-width: 950px)')
      .pipe(
        map(({ matches }) => {
          return matches;
        })
      )
      .subscribe(isTablet => {
        this.disableToggle = isTablet;
        this.toggleCollapse(isTablet);
      });
  }

  toggleCollapse(isTablet?: boolean) {
    isTablet === undefined
      ? (this.collapse = !this.collapse)
      : (this.collapse = isTablet);
    this.emitCollapse.emit(this.collapse);
  }

}
