import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ICourseOverview, TermsAgreementModalResult, TermsAgreementSubtitleText } from '@cirrus/models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BluePopUpComponent } from '../blue-pop-up/blue-pop-up.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class TermsAgreementServiceService {
  private readonly environment: Record<string, unknown>;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    @Inject('environment') environment: Record<string, unknown>
  ) {
    this.environment = environment;
  }

  openTermsAndConditionsModal(
    course: ICourseOverview,
    subtitle_text: TermsAgreementSubtitleText
  ): Observable<boolean> {
    if (!course.has_agreement) {
      return of(true);
    }
    const data = {
      title: 'Terms And Conditions',
      subTitle: `Please read the following before ${subtitle_text} then click Agree to continue`,
      body: course.agreement_body,
      buttons: ['Agree', 'Disagree'],
    };

    const dialogRef = this.dialog.open(BluePopUpComponent, {
      data: data,
      height: '70%',
      maxWidth: '515px',
      panelClass: 'blue-popup-container',
    });

    return dialogRef.afterClosed().pipe(
      map((result: TermsAgreementModalResult) => {
        if (result.data === 'Disagree') {
          return false;
        }
        this.acceptTermsServiceAgreement(
          course.course_attempt.user_course.id
        ).subscribe();

        return true;
      })
    );
  }

  acceptTermsServiceAgreement(user_course_id: number) {
    return this.http.post(
      `${this.environment.baseUrl}/api/v4/user_courses/${user_course_id}/agreement/accept`,
      null
    );
  }
}
