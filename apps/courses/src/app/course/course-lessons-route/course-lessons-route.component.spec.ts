import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonsRouteComponent } from './course-lessons-route.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { CourseLessonsComponent } from '@cirrus/ui';
import { MockComponent } from 'ng-mocks';

describe('CourseLessonsRouteComponent', () => {
  let component: CourseLessonsRouteComponent;
  let fixture: ComponentFixture<CourseLessonsRouteComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseLessonsRouteComponent, MockComponent(CourseLessonsComponent)],
      providers:[
        provideMockStore(),
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockActivatedRoute {}
