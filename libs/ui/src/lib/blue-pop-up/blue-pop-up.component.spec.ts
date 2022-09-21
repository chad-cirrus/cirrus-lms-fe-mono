import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BluePopUpComponent } from './blue-pop-up.component';

describe('BluePopUpComponent', () => {
  let component: BluePopUpComponent;
  let fixture: ComponentFixture<BluePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BluePopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BluePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
