import { async, TestBed } from '@angular/core/testing';
import { BadgeModule } from './badge.module';

describe('BadgeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BadgeModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(BadgeModule).toBeDefined();
  });
});
