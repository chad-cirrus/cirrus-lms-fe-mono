import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericResponsiveMatTableComponent } from './generic-responsive-mat-table.component';

describe('GenericResponsiveMatTableComponent', () => {
  let component: GenericResponsiveMatTableComponent;
  let fixture: ComponentFixture<GenericResponsiveMatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericResponsiveMatTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericResponsiveMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
