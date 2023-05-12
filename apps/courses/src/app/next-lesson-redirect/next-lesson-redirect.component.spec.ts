import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextLessonRedirectComponent } from './next-lesson-redirect.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

describe('NextLessonRedirectComponent', () => {
  let component: NextLessonRedirectComponent;
  let fixture: ComponentFixture<NextLessonRedirectComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextLessonRedirectComponent],
      providers: [
        provideMockStore(),
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NextLessonRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockActivatedRoute {
  mockParamsSubject = new BehaviorSubject<Params>({});
  params = this.mockParamsSubject.asObservable();

}
