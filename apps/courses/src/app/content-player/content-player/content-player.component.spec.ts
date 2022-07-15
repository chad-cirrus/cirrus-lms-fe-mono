import { ContentPlayerComponent } from './content-player.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskService } from '../../task.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { coursesReducers } from '../../store/reducers';

describe('ContentPlayerComponent', () => {
  let component: ContentPlayerComponent;
  let fixture: ComponentFixture<ContentPlayerComponent>;

  beforeEach(async () => {
    await TestBed
      .configureTestingModule({
        imports: [
          MatDialogModule,
          StoreModule.forRoot(coursesReducers),
          HttpClientTestingModule,
          FlexLayoutModule,
        ],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: {} },
          TaskService,
        ],
        declarations: [ContentPlayerComponent],
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('has a closed menu by default', (done) => {
    component.menuOpen$.subscribe((open) => {
      expect(open).toBeFalsy();
      done();
    });
  });
});
