import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOverviewRouteComponent } from './course-overview-route.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponent } from 'ng-mocks';
import { CourseOverviewComponent } from '@cirrus/ui';

describe('CourseOverviewRouteComponentComponent', () => {
  let component: CourseOverviewRouteComponent;
  let fixture: ComponentFixture<CourseOverviewRouteComponent>;

  beforeEach(async () => {
    let store: MockStore;

    await TestBed.configureTestingModule({
      declarations: [CourseOverviewRouteComponent, MockComponent(CourseOverviewComponent)],
      providers:[provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseOverviewRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
