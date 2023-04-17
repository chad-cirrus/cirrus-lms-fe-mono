import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ICourseOverview } from '@cirrus/models';
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

  openTermsAndConditionsModal(course: ICourseOverview): Observable<boolean> {
    if (!course.has_agreement) {
      return of(true);
    }
    const data = {
      title: 'Terms And Conditions',
      subTitle:
        'Please read the following before re-enrolling then click Agree to continue',
      body: course.agreement_body,
      buttons: ['Agree', 'Disagree'],
    };

    const dialogRef = this.dialog.open(BluePopUpComponent, {
      data: data,
      height: '70%',
      maxWidth: '515px',
    });

    return dialogRef.afterClosed().pipe(
      map(result => {
        if (!result) {
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
      `${this.environment.baseUrl}/user_courses/${user_course_id}/agreement/accept`,
      null
    );
  }
}
