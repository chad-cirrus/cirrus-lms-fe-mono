import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScormContentDialogComponent } from './scorm-content-dialog.component';

describe('ScormContentDialogComponent', () => {
  let component: ScormContentDialogComponent;
  let fixture: ComponentFixture<ScormContentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScormContentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScormContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
