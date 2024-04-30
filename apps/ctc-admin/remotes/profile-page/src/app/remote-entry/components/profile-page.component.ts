import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

//Mat table example (remove later)
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

//Mat table example (remove later)
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  @ViewChild('ctcAdminHeader', { read: ViewContainerRef })
  headerViewContainer!: ViewContainerRef;
  @ViewChild('ctcAdminSidebar', { read: ViewContainerRef })
  sidebarViewContainer!: ViewContainerRef;

  //Mat table example (remove later)
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

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
