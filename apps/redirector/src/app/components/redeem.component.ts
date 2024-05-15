import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RedemptionCodesService } from '../services/redemption-codes.service';
import { environment } from 'apps/redirector/src/environments/environment';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrl: './redeem.component.scss',
})
export class RedeemComponent implements OnInit {

  redemptionCode: string | null = '';
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private redemptionCodesService: RedemptionCodesService
    ) {
  }

  ngOnInit() {
    this.redemptionCode = this.route.snapshot.paramMap.get('code');

    this.redemptionCodesService.redeemCode(this.redemptionCode).subscribe(
      res => {
        window.location.href = `${environment.baseUrl + res['redirect_url']}`;
      },
      err => {
        console.log('Error: ', err);
        this.message = 'Invalid code.'
      }
    )
  }
}
