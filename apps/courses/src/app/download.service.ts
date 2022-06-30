import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../environments/environment';
import { AppState } from './store/reducers';
import { selectCirrusUser } from './store/selectors/cirrus-user.selector';


@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  user_id!: number;

  cirrusUser = this.store.select(selectCirrusUser).subscribe(user => {
    this.user_id = user.id
  })


  constructor(private http: HttpClient, private store: Store<AppState>) {}

  downloadCertificate(course_attempt_id: number) {
    const url = `${environment.baseUrl}/api/v4/pdf/certificate`;
    const queryParams = { course_attempt_id }
    return this.http
      .get(url, {params:queryParams, responseType: 'blob'})
      .pipe();
  }

}
