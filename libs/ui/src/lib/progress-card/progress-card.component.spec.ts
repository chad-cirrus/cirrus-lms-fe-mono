import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ICourseProgress, ProgressType } from '@cirrus/models';
import { CirrusMaterialModule } from '../cirrus-material.module';

import { ProgressCardComponent } from './progress-card.component';

describe('ProgressCardComponent', () => {
  let component: ProgressCardComponent;
  let fixture: ComponentFixture<ProgressCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirrusMaterialModule],
      declarations: [ProgressCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct progress type and progress', () => {
    component.progress = {
      type: ProgressType.Ground,
      completedCourses: 5,
      totalCourses: 10,
    };
    fixture.detectChanges();
    const progressTypeElement = fixture.debugElement.nativeElement;

    expect(
      progressTypeElement.querySelector('.progress-type').textContent
    ).toContain('Ground');
    expect(
      progressTypeElement.querySelector('.courses-completed').textContent
    ).toContain('5');
    expect(
      progressTypeElement.querySelector('.total-courses').textContent
    ).toContain('10');
  });


  it('should display round numbers for courses completed', () => {
   const progress: ICourseProgress = {
      type: ProgressType.SelfStudy,
      completedCourses: 2.2,
      totalCourses: 5.5
    }

    component.progress = progress
    fixture.detectChanges();
    const progressTypeElement = fixture.debugElement.nativeElement;
    const text = progressTypeElement.querySelector('.courses-completed')
    const format = parseInt(text.textContent)
    expect(
      Number.isInteger(format)
    ).toBeTruthy()
  })

  it('should display round numbers for total courses', () => {
    const progress: ICourseProgress = {
       type: ProgressType.SelfStudy,
       completedCourses: 2.2,
       totalCourses: 5.5
     }

     component.progress = progress
     fixture.detectChanges();
     const progressTypeElement = fixture.debugElement.nativeElement;
     const text = progressTypeElement.querySelector('.total-courses')
     const format = parseInt(text.textContent)
     expect(
       Number.isInteger(format)
     ).toBeTruthy()
   })



});
