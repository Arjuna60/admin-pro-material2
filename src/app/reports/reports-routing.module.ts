import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { Routes, RouterModule } from '@angular/router';
import { CustomerReportsComponent } from './customer-reports/customer-reports.component';

const routes: Routes = [ {
  path: '',
  component: ReportsComponent
},
  {
    path: 'salesbyproduct',
    component: CustomerReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
