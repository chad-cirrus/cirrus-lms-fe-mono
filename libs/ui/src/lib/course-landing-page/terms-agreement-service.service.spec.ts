import { TestBed } from '@angular/core/testing';

import { TermsAgreementServiceService } from './terms-agreement-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ICourseOverview, TermsAgreementSubtitleText } from '@cirrus/models';
import { of } from 'rxjs';
import { course351 } from '../mock-data/mock-courses.data';

describe('TermsAgreementServiceService', () => {
  let service: TermsAgreementServiceService;
  let dialog: MatDialog;
  const dialogMock1 = {
    open: () => {
      return {
        afterClosed: () => of({ data: 'Agree' }),
      };
    },
  };
  const dialogMock2 = {
    open: () => {
      return {
        afterClosed: () => of({ data: 'Disagree' }),
      };
    },
  };

  const environment = { baseUrl: 'http://cirrusapproach.local:3000' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TermsAgreementServiceService,
        { provide: 'environment', useValue: environment },
        { provide: MatDialog, useValue: dialogMock1 },
      ],
    });
  });

  describe('openTermsAndConditionsModal', () => {
    beforeEach(() => {
      service = TestBed.inject(TermsAgreementServiceService);
      dialog = TestBed.inject(MatDialog);
    });
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return true when the course does not have an agreement', done => {
      const course: ICourseOverview = {
        has_agreement: false,
      } as ICourseOverview;
      service
        .openTermsAndConditionsModal(course, TermsAgreementSubtitleText.START)
        .subscribe(result => {
          expect(result).toBe(true);
          done();
        });
    });
  });
  describe('openTermsAndConditionsModal', () => {
    beforeEach(() => {
      TestBed.overrideProvider(MatDialog, { useValue: dialogMock2 });
      service = TestBed.inject(TermsAgreementServiceService);
      dialog = TestBed.inject(MatDialog);
    });
    it('should return false if user selects "Disagree"', done => {
      const course: ICourseOverview = {
        has_agreement: true,
      } as ICourseOverview;
      service
        .openTermsAndConditionsModal(course, TermsAgreementSubtitleText.START)
        .subscribe(result => {
          expect(result).toBe(false);
          done();
        });
    });
  });
});
