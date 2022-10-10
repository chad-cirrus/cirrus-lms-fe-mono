import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesFullComponent } from './badges-full.component';

describe('BadgesFullComponent', () => {
  let component: BadgesFullComponent;
  let fixture: ComponentFixture<BadgesFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BadgesFullComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgesFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
