import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonContentPlayerComponent } from './lesson-content-player.component';

describe('LessonContentPlayerComponent', () => {
  let component: LessonContentPlayerComponent;
  let fixture: ComponentFixture<LessonContentPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonContentPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonContentPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
