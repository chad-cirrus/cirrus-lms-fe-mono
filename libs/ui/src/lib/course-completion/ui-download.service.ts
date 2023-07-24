import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ICirrusUser, ICourse, ICourseOverview, IOrder } from '@cirrus/models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, filter, finalize, tap } from 'rxjs/operators';

@Injectable()
export class UiDownloadService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private readonly environment: Record<string, unknown>;
  private loadingSubject = new BehaviorSubject(false);

  loading$ = this.loadingSubject.asObservable();

  private certificateLoadingSubject = new BehaviorSubject(false);
  certificateLoading$ = this.certificateLoadingSubject.asObservable();

  private transcriptLoadingSubject = new BehaviorSubject(false);
  transcriptloading$ = this.transcriptLoadingSubject.asObservable();

  private selectedIdSubject = new BehaviorSubject(0);
  selectedRowId$ = this.selectedIdSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject('environment') environment: Record<string, unknown>
  ) {
    this.environment = environment;
  }

  setSelectedId(value: number) {
    this.selectedIdSubject.next(value);
  }

  getCourse(course_id: number): Observable<any> {
    const url = `${this.environment['baseUrl']}/api/v4/courses/${course_id}}`;
    return this.http.get(url);
  }

  downloadCertificate(user_certificate_id: number) {
    const url = `${this.environment['baseUrl']}/api/v4/user_certificates/${user_certificate_id}`;
    return of(null).pipe(
      tap(() => this.certificateLoadingSubject.next(true)),
      concatMap(() => this.http.get(url, { responseType: 'blob' })),
      finalize(() => this.certificateLoadingSubject.next(false))
    );
  }

  downloadTranscript(course_id: number, course_attempt_id: number) {
    const param =
      course_attempt_id > 0 ? `?course_attempt_id=${course_attempt_id}` : '';
    const url =
      `${this.environment['baseUrl']}/api/v4/courses/${course_id}/transcript.pdf` +
      param;
    return of(null).pipe(
      tap(() => this.transcriptLoadingSubject.next(true)),
      concatMap(() => this.http.get(url, { responseType: 'blob' })),
      finalize(() => this.transcriptLoadingSubject.next(false))
    );
  }

  courseReEnroll(payload: ReEnrollPayload) {
    const { course_id, user_id } = payload;
    return this.http.post(
      `${this.environment.baseUrl}/api/v3/courses/reenroll/${course_id}/${user_id}`,
      {}
    );
  }

  courseEnroll(course: ICourseOverview, order: IOrder | null): Observable<any> {
    const formatOrder = {
      order: {
        order_line_items: [
          {
            product_id: course.id,
            product: {
              list_price: course.list_price?.toString(),
            }
          }
        ],
      },
    };

    if (order && order.order_line_items.length > 0) {
      const previousCartItems = [...order.order_line_items];
      const courseExistsInCart = previousCartItems.filter((item) => item.product_id === course.id).length !== 0;

      if(courseExistsInCart) {
        return of(true)
      }

      formatOrder.order.order_line_items.push(...previousCartItems);
    }

    return this.http.post(
      `${this.environment.baseUrl}/api/v3/orders/update-cart`,
      formatOrder
    );
  }

  courseEnrollForUnauth(course: ICourseOverview): Observable<any> {
    const newOrder = {
      order: {
        order_line_items: [
          {
            product_id: course.id,
            product: {
              list_price: course.list_price?.toString(),
              title: course.title,
              thumbnail_image_url: course.thumbnail_image_url
            },
          },
        ]
      }
    }
    const exisitingCourses = JSON.parse(<string>localStorage.getItem('checkout-state'));

    if (exisitingCourses !== null) {
      const existingOrderLineItems = [...exisitingCourses.order.order_line_items];

      if (existingOrderLineItems.length > 0) {
        const courseExistsInCart  = existingOrderLineItems.filter((item) => item.product_id === course.id).length !== 0;
        if (courseExistsInCart) {
          return of(true);
        }
        newOrder.order.order_line_items.push(...existingOrderLineItems)
      }
    }
    
    localStorage.setItem('checkout-state', JSON.stringify(newOrder));
    localStorage.setItem('is-checkout', 'true');
    return of(true);
  }
}

interface ReEnrollPayload {
  course_id: number;
  user_id: number;
}
