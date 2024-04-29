import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shell-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shell-container.component.html',
  styleUrl: './shell-container.component.scss',
})
export class ShellContainerComponent {
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
