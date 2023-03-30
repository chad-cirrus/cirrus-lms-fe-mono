import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePlayerComponent } from './course-player.component';
import { ICoursePlayerConfig } from '@cirrus/models';
import { MockComponent } from 'ng-mocks';
import { CtaButtonComponent } from '@cirrus/ui';

describe('CoursePlayerComponent', () => {
  let component: CoursePlayerComponent;
  let fixture: ComponentFixture<CoursePlayerComponent>;
  let config: ICoursePlayerConfig = { buttonText: '', header: '', index: '', thumbnail: '', title: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CoursePlayerComponent,
        MockComponent(CtaButtonComponent),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePlayerComponent);
    component = fixture.componentInstance;
    component.config = config;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
