import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { BankListComponent } from './bank-list/bank-list.component';

@NgModule({
  declarations: [BankListComponent],
  imports: [
    CommonModule,
    BankRoutingModule
  ]
})
export class BankModule { }
