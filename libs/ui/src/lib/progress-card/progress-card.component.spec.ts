import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressType } from '@cirrus/models';
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
    ).toContain('/10');
  });
});
