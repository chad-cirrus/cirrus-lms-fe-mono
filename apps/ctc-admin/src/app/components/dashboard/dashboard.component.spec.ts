import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CtcAdminService } from '../../app.service';
import { ITrainingCenter } from '../../models/ITrainingCenter';
import { Observable, of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { jest } from '@jest/globals';
import { InitialsPipe } from '../../pipes/initials.pipe';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let trainingCenter: ITrainingCenter = {
    "id": "a0D0B00000FJZ2BUAX",
    "name": "Gold Standard Aviation - KOPF",
    "incepts_on": "2013-09-10",
    "audit_renewal_on": "2023-04-12",
    "flight_audit_on": "2015-12-01",
    "platinum_center": true,
    "phone": "(305) 804-2166",
    "website": "https://www.goldstandardaviation.com",
    "primary_contact": {
        "id": "003U000000Oq2irIAB",
        "first_name": "Jack",
        "last_name": "Boyd",
        "email": "jack@goldstandardaviation.com.invalid"
    },
    "qualifications": [
        "Cirrus Perspective Avionics Available",
        "SR20 Rental",
        "SR22 Rental",
        "SR22T Rental",
        "Cirrus Platinum Training Partner",
        "Simulator Available"
    ],
    "training_center_rtm_user": {
        "id": "0050B000007MHvqQAG",
        "first_name": "Amy",
        "last_name": "Voss",
        "email": "avoss@cirrusaircraft.com.invalid"
    },
    "shipping_address": {
        "street": "301 NE 20th Ter",
        "city": "Miami",
        "state": "FL",
        "country": "United States",
        "postal_code": "33137-5109"
    },
    "insurance": {
        "company": "W. Brown \u0026 Associates",
        "notes": null,
        "policy_end_on": null,
        "policy_start_on": null,
        "product_liability": 1000000.0
    },
    "cirrus_bucks": {
        "balance": 36292.74,
        "customer_number": "CB0094"
    }
};
  let ctcAdminServiceMock: {
    getUsersTrainingCenter: () => Observable<ITrainingCenter>;
    currentTrainingCenter: Observable<ITrainingCenter>;
  };

  beforeEach(() =>  {
    ctcAdminServiceMock = {
      getUsersTrainingCenter: jest.fn().mockReturnValue(of(trainingCenter)) as () => Observable<ITrainingCenter>,
      currentTrainingCenter: of(trainingCenter),
    };
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, InitialsPipe],
      providers: [{ provide: CtcAdminService, useValue: ctcAdminServiceMock }],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    // Move the TestBed.overrideProvider code block before TestBed.createComponent
    TestBed.overrideProvider(CtcAdminService, { useValue: ctcAdminServiceMock });
    fixture = TestBed.createComponent(DashboardComponent);
  });

  afterEach(() => {
    fixture.destroy();
  });



  it('should create', () => {
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should get training center', () => {
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.trainingCenter).toEqual(trainingCenter);
  });

});
