import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { IndexdbDemoComponent } from './indexdb-demo/indexdb-demo.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'indexdb-demo', component: IndexdbDemoComponent},
  { path: 'dashboard/:menuid', component: DashboardComponent },
];
