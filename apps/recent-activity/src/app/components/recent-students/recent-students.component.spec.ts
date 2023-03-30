import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentStudentsComponent } from './recent-students.component';

jest.mock('swiper', () => ({
  Swiper: { use() {} },
  Navigation: () => null,
  Pagination: () => null,
}));

describe('RecentStudentsComponent', () => {
  let component: RecentStudentsComponent;
  let fixture: ComponentFixture<RecentStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentStudentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
