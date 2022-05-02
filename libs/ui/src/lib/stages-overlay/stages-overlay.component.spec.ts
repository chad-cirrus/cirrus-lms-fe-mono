import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesOverlayComponent } from './stages-overlay.component';

describe('StagesOverlayComponent', () => {
  let component: StagesOverlayComponent;
  let fixture: ComponentFixture<StagesOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagesOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagesOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
