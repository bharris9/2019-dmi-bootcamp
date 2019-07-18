import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../core/home/home.component';
import { MlbComponent } from '../mlb/mlb.component';
import { MlbBoxScoreComponent } from '../mlb/mlb-box-score/mlb-box-score.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'mlb',
    children: [
      {
        path: '',
        component: MlbComponent
      },
      {
        path: ':id',
        component: MlbBoxScoreComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
