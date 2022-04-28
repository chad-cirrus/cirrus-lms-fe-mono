import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonContentPlayerMenuComponent } from './lesson-content-player-menu.component';

describe('LessonContentPlayerMenuComponent', () => {
  let component: LessonContentPlayerMenuComponent;
  let fixture: ComponentFixture<LessonContentPlayerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonContentPlayerMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonContentPlayerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
