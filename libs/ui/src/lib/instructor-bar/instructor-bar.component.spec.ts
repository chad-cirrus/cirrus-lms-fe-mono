import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorBarComponent } from './instructor-bar.component';

describe('InstructorBarComponent', () => {
  let component: InstructorBarComponent;
  let fixture: ComponentFixture<InstructorBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
