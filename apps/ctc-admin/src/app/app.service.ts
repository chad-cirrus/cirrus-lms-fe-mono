import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITrainingCenter } from './models/ITrainingCenter';
import { ICourses } from './models/ICourses';
import { IAddressState } from './models/IAddressState';
import { map } from 'rxjs/operators';

// placeholder for the list of US states until we get them from the API
const states = [
  { name: 'Please Choose', abbreviation: '--' },
  { name: 'Alabama', abbreviation: 'AL' },
  { name: 'Alaska', abbreviation: 'AK' },
  { name: 'Arizona', abbreviation: 'AZ' },
  { name: 'Arkansas', abbreviation: 'AR' },
  { name: 'California', abbreviation: 'CA' },
  { name: 'Colorado', abbreviation: 'CO' },
  { name: 'Connecticut', abbreviation: 'CT' },
  { name: 'Delaware', abbreviation: 'DE' },
  { name: 'Florida', abbreviation: 'FL' },
  { name: 'Georgia', abbreviation: 'GA' },
  { name: 'Hawaii', abbreviation: 'HI' },
  { name: 'Idaho', abbreviation: 'ID' },
  { name: 'Illinois', abbreviation: 'IL' },
  { name: 'Indiana', abbreviation: 'IN' },
  { name: 'Iowa', abbreviation: 'IA' },
  { name: 'Kansas', abbreviation: 'KS' },
  { name: 'Kentucky', abbreviation: 'KY' },
  { name: 'Louisiana', abbreviation: 'LA' },
  { name: 'Maine', abbreviation: 'ME' },
  { name: 'Maryland', abbreviation: 'MD' },
  { name: 'Massachusetts', abbreviation: 'MA' },
  { name: 'Michigan', abbreviation: 'MI' },
  { name: 'Minnesota', abbreviation: 'MN' },
  { name: 'Mississippi', abbreviation: 'MS' },
  { name: 'Missouri', abbreviation: 'MO' },
  { name: 'Montana', abbreviation: 'MT' },
  { name: 'Nebraska', abbreviation: 'NE' },
  { name: 'Nevada', abbreviation: 'NV' },
  { name: 'New Hampshire', abbreviation: 'NH' },
  { name: 'New Jersey', abbreviation: 'NJ' },
  { name: 'New Mexico', abbreviation: 'NM' },
  { name: 'New York', abbreviation: 'NY' },
  { name: 'North Carolina', abbreviation: 'NC' },
  { name: 'North Dakota', abbreviation: 'ND' },
  { name: 'Ohio', abbreviation: 'OH' },
  { name: 'Oklahoma', abbreviation: 'OK' },
  { name: 'Oregon', abbreviation: 'OR' },
  { name: 'Pennsylvania', abbreviation: 'PA' },
  { name: 'Rhode Island', abbreviation: 'RI' },
  { name: 'South Carolina', abbreviation: 'SC' },
  { name: 'South Dakota', abbreviation: 'SD' },
  { name: 'Tennessee', abbreviation: 'TN' },
  { name: 'Texas', abbreviation: 'TX' },
  { name: 'Utah', abbreviation: 'UT' },
  { name: 'Vermont', abbreviation: 'VT' },
  { name: 'Virginia', abbreviation: 'VA' },
  { name: 'Washington', abbreviation: 'WA' },
  { name: 'West Virginia', abbreviation: 'WV' },
  { name: 'Wisconsin', abbreviation: 'WI' },
  { name: 'Wyoming', abbreviation: 'WY' },
] as IAddressState[];

/**
 * Service for managing CTC Admin functionality.
 */
@Injectable({
  providedIn: 'root',
})
export class CtcAdminService {
  private trainingCenterSubject = new BehaviorSubject<ITrainingCenter>({} as ITrainingCenter);
  currentTrainingCenter = this.trainingCenterSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the training center information for the current user.
   * @returns An Observable of type ITrainingCenter.
   */
  getUsersTrainingCenter(): Observable<ITrainingCenter> {
    return this.http.get<ITrainingCenter>(`${environment.baseUrl}/api/v5/training_center`);
  }

  /**
   * Saves a training center.
   *
   * @param trainingCenter - The training center to be saved.
   * @returns An observable that emits the saved training center.
   */
  saveTrainingCenter(trainingCenter: ITrainingCenter): Observable<ITrainingCenter> {
    return this.http
      .post<ITrainingCenter>(`${environment.baseUrl}/api/v5/training_center`, trainingCenter)
      .pipe(map(response => response));
  }

  /**
   * Updates the training center information.
   * @param training_center - The updated training center object.
   */
  updateTrainingCenter(training_center: ITrainingCenter) {
    this.trainingCenterSubject.next(training_center);
  }

  /**
   * Retrieves the list of courses offered.
   * @returns An Observable of type any.
   */
  getCoursesOffered(): Observable<ICourses> {
    const url = `${environment.baseUrl}/api/v5/offered_courses`;
    return this.http.get<ICourses>(url);
  }

  /**
   * Retrieves a list of US states.
   * This is a placeholder until the states are retrieved from the API.
   *
   * @returns An array of `IAddressState` objects representing the address states.
   */
  getStateList(): IAddressState[] {
    return states;
  }
}
