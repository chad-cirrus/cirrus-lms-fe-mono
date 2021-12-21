import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaContentDialogComponent } from './media-content-dialog.component';

describe('MediaContentDialogComponent', () => {
  let component: MediaContentDialogComponent;
  let fixture: ComponentFixture<MediaContentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaContentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
