import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IContent, ICourseOverview, IOrder } from '@cirrus/models';
import { Observable, of } from 'rxjs';
import { CoursePreviewVideoPlayerComponent } from './course-preview-video-player/course-preview-video-player.component';

@Injectable({
  providedIn: 'root',
})
export class UiCourseService {
  private readonly environment: Record<string, unknown>;
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    @Inject('environment') environment: Record<string, unknown>,
  ) {
    this.environment = environment;
  }

  watchPreview(content: IContent) {
    this.dialog.open(CoursePreviewVideoPlayerComponent, {
      data: content,
      width: '100%',
      backdropClass: 'course-preview-video',
      panelClass: 'course-preview-video',
    });
  }

  freeCourseEnroll(course: ICourseOverview): Observable<any> {
    return this.http.post(`${this.environment.baseUrl}/api/v4/user_courses/`, { course_id: course.id });
  }

  courseReEnroll(payload: ReEnrollPayload) {
    const { course_id, user_id } = payload;
    return this.http.post(`${this.environment.baseUrl}/api/v3/courses/reenroll/${course_id}/${user_id}`, {});
  }

  courseEnroll(course: ICourseOverview, order: IOrder | null): Observable<any> {
    const formatOrder = {
      order: {
        order_line_items: [
          {
            product_id: course.id,
            product: {
              list_price: course.list_price?.toString(),
            },
          },
        ],
      },
    };

    if (order && order.order_line_items.length > 0) {
      const previousCartItems = [...order.order_line_items];
      const courseExistsInCart = previousCartItems.filter(item => item.product_id === course.id).length !== 0;

      if (courseExistsInCart) {
        return of(true);
      }

      formatOrder.order.order_line_items.push(...previousCartItems);
    }

    return this.http.post(`${this.environment.baseUrl}/api/v3/orders/update-cart`, formatOrder);
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
              thumbnail_image_url: course.thumbnail_image_url,
            },
          },
        ],
      },
    };
    const exisitingCourses = JSON.parse(<string>localStorage.getItem('checkout-state'));

    if (exisitingCourses !== null) {
      const existingOrderLineItems = [...exisitingCourses.order.order_line_items];

      if (existingOrderLineItems.length > 0) {
        const courseExistsInCart = existingOrderLineItems.filter(item => item.product_id === course.id).length !== 0;
        if (courseExistsInCart) {
          return of(true);
        }
        newOrder.order.order_line_items.push(...existingOrderLineItems);
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
