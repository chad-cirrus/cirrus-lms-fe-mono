import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursePreviewVideoPlayerComponent } from './course-preview-video-player.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VideoPlayerComponent } from '../video-player/video-player.component';

jest.mock('@vimeo/player', () => {
  return { default: function() {
      return {
        play() {return;},
        on() {return;},
      }
  } };
});

describe('CoursePreviewVideoPlayerComponent', () => {
  let component: CoursePreviewVideoPlayerComponent;
  let fixture: ComponentFixture<CoursePreviewVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursePreviewVideoPlayerComponent, VideoPlayerComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePreviewVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
