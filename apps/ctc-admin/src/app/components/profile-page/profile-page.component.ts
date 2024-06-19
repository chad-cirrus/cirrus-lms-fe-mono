import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITrainingCenter } from '../../models/ITrainingCenter';
import { Subscription } from 'rxjs';
import { CtcAdminService } from '../../app.service';
import { ICourses } from '../../models/ICourses';
import { IAddressState } from '../../models/IAddressState';

export interface TableData {
  name: string;
  role: string;
  phone: string;
  email: string;
  action: string;
}

const ELEMENT_DATA: TableData[] = [
  {
    name: 'Matthew Carriganson',
    role: 'Super Admin, Center Contact',
    phone: '(000) 000-0000',
    email: 'matthew.carrig9239@gmail.com',
    action: '',
  },
  {
    name: 'John Pattison',
    role: 'TCI',
    phone: '(000) 000-0000',
    email: 'johnemail@gmail.com',
    action: '',
  },
  {
    name: 'Darius Jackson',
    role: 'Former CSIP, TCI',
    phone: '(000) 000-0000',
    email: 'dariusemail@gmail.com',
    action: '',
  },
];

/**
 * Represents the profile page component.
 */
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  //Mat table example (remove later)
  displayedColumns: string[] = ['name', 'role', 'phone', 'email', 'action'];
  dataSource = ELEMENT_DATA;

  private activeTab: string = 'profile';

  states: IAddressState[] = [];
  trainingCenter: ITrainingCenter = {} as ITrainingCenter;
  private subscription: Subscription = new Subscription();
  coursesOffered: ICourses | undefined = undefined;
  categoryList: { key: string; value: string[] }[] = [{} as { key: string; value: string[] }];
  coursesOffered$: Subscription = new Subscription();

  constructor(private ctcAdminService: CtcAdminService) {}

  /**
   * Unsubscribes from the subscription when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.subscription = this.ctcAdminService.currentTrainingCenter.subscribe(data => {
      this.trainingCenter = data;
    });

    this.coursesOffered$ = this.ctcAdminService.getCoursesOffered().subscribe(data => {
      this.coursesOffered = data;
      this.categoryList = [{} as { key: string; value: string[] }];
      this.loadCategoryList(this.coursesOffered);
    });

    this.states = this.ctcAdminService.getStateList();
  }

  /**
   * Sets the active tab.
   * @param tab - The tab to set as active.
   */
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  /**
   * Checks if a tab is active.
   * @param tab - The tab to check.
   * @returns 'active' if the tab is active, otherwise an empty string.
   */
  isActiveTab(tab: string): string {
    return this.activeTab === tab ? 'active' : '';
  }

  /**
   * Loads the category list based on the courses offered.
   * @param courses - The courses offered.
   */
  loadCategoryList(courses: ICourses) {
    this.categoryList = [{} as { key: string; value: string[] }];
    if (this.coursesOffered?.courses) {
      this.coursesOffered.courses.forEach(element => {
        element.course_categories.forEach(category => {
          if (this.categoryList.find(x => x.key === category.name) === undefined) {
            this.categoryList.push({ key: category.name, value: [element.name] });
          } else {
            const _obj = this.categoryList.find(x => x?.key === category?.name);
            if (_obj) {
              _obj.value.push(element.name);
            }
          }
        });
      });
    }
  }
}
