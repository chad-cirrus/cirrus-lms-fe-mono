import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  @ViewChild('ctcAdminHeader', { read: ViewContainerRef })
  headerViewContainer!: ViewContainerRef;
  @ViewChild('ctcAdminSidebar', { read: ViewContainerRef })
  sidebarViewContainer!: ViewContainerRef;

  ngOnInit(): void {
    this.loadRemotes();
  }

  async loadRemotes(): Promise<void> {
    const mfeHeader = await import('header/Component');
    const mfeSidebar = await import('sidebar/Component');
    
    this.headerViewContainer.createComponent(mfeHeader.RemoteEntryComponent);
    this.sidebarViewContainer.createComponent(mfeSidebar.RemoteEntryComponent);
  }
}
