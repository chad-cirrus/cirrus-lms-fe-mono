import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressStat, ProgressType } from '@cirrus/models';
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
      status: '',
      type: ProgressType.Ground,
      completed: 5,
      total: 10
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


  it('should display round number or one decimal for courses completed', () => {
   const progress: ProgressStat = {
     status: '',
     type: ProgressType.SelfStudy,
      completed: 2.55,
      total: 5.5
    }

    component.progress = progress;
    fixture.detectChanges();
    const progressTypeElement = fixture.debugElement.nativeElement;
    const text = progressTypeElement.querySelector('.courses-completed');
    const format = text.textContent;
    const index = format.indexOf('.');
    const numbersAfterDec = index === -1 ? true  : format.slice(index + 1).length < 2

    expect(
      numbersAfterDec
    ).toBeTruthy()
  })


});
