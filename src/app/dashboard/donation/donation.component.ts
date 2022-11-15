import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as md5 from 'md5';
import * as uuid from 'uuid';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss'],
})
export class DonationComponent implements OnInit {

  merchantId = '508029';
  accountId = 512321;
  referenceCode = uuid.v4();
  amount: string;
  tax = 2310;
  taxReturn: string;
  signature: string;
  isButtonDisabled = true;
  artistName: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.artistName = localStorage.getItem('artistName');
  }

  updateValues(amount: number) {
    this.amount = String(amount);
    this.taxReturn = String(Number(amount) - this.tax);
    const data = `4Vj8eK4rloUd272L48hsrarnUA~${this.merchantId}~${this.referenceCode}~${this.amount}~COP`;
    const hash = md5(data);
    this.signature = hash;
  }

  enableButton() {
    this.isButtonDisabled = false;
  }

  goBack() {
    this.router.navigate(['dashboard/discover']);
  }
}
