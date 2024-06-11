import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITrainingCenter } from './models/ITrainingCenter';

@Injectable({
  providedIn: 'root',
})
export class CtcAdminService {
  private trainingCenterSubject = new BehaviorSubject<ITrainingCenter>({} as ITrainingCenter);
  currentTrainingCenter = this.trainingCenterSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUsersTrainingCenter(): Observable<ITrainingCenter> {
    return this.http.get<ITrainingCenter>(`${environment.baseUrl}/api/v5/training_center`);
  }

  updateTrainingCenter(training_center: ITrainingCenter) {
    this.trainingCenterSubject.next(training_center);
  }
}
