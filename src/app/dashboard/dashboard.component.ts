import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  title = 'dashboard';

  urlMenuId!: string;
  private urlParameterSubscription!: Subscription;

  constructor( private router: Router,
               private activatedRoute: ActivatedRoute ){}

  ngOnInit(): void {
    this.urlParameterSubscription = this.activatedRoute.params.subscribe(async (p) => {
      this.urlMenuId = p['menuid'].toLowerCase() || '';
    })

  }

  ngOnDestroy(): void {}
}

