import { Component, OnInit, OnDestroy } from '@angular/core';
import { MobileMenuService } from '../../../../../../shared/services/mobile-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy{

  isMobileMenuActive = false;
  private subscription: Subscription;

  constructor(private mobileMenuService: MobileMenuService) {
    this.subscription = new Subscription(); // Initialize the subscription property
  }

  ngOnInit() {
    this.subscription = this.mobileMenuService.mobileMenuActive$.subscribe(
      (active) => {
        this.isMobileMenuActive = active;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
