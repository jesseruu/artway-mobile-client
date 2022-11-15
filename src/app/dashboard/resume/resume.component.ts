import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {

  state: string;
  amount: string;
  date: string;
  id: string;

  constructor(private router: Router, private loadingCtrl: LoadingController, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.state = params.state;
        this.amount = params.amount;
        this.date = params.date;
        this.id = params.id;
      }
      );
  }

  async goBack() {
    await this.router.navigate(['dashboard/home']);
  }

}
