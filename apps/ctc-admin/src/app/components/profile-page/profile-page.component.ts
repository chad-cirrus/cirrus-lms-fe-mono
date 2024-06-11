import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITrainingCenter } from '../../models/ITrainingCenter';
import { Subscription } from 'rxjs';
import { CtcAdminService } from '../../app.service';

export interface TableData {
  name: string;
  role: string;
  phone: string;
  email: string;
  action: string;
}

const ELEMENT_DATA: TableData[] = [
  {
    name: "Matthew Carriganson",
    role: "Super Admin, Center Contact",
    phone: "(000) 000-0000",
    email: "matthew.carrig9239@gmail.com",
    action: "",
  },
  {
    name: "John Pattison",
    role: "TCI",
    phone: "(000) 000-0000",
    email: "johnemail@gmail.com",
    action: "",
  },
  {
    name: "Darius Jackson",
    role: "Former CSIP, TCI",
    phone: "(000) 000-0000",
    email: "dariusemail@gmail.com",
    action: "",
  }
];


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit, OnDestroy{
  //Mat table example (remove later)
  displayedColumns: string[] = ['name', 'role', 'phone', 'email', 'action'];
  dataSource = ELEMENT_DATA;
  private activeTab: string = 'profile';
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  isActiveTab(tab: string): string {
    return this.activeTab === tab ? 'active' : '';
  }
  trainingCenter: ITrainingCenter = {} as ITrainingCenter;
  private subscription: Subscription = new Subscription();

  constructor(private ctcAdminService: CtcAdminService) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();  }

  ngOnInit(): void {
    this.subscription = this.ctcAdminService.currentTrainingCenter.subscribe(data => {
      this.trainingCenter = data;
    });
  }
}
