import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { CustomerNewComponent } from './customer-new/customer-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { RepDialogComponent } from './rep-dialog/rep-dialog.component';
import { CustomerPopComponent } from './customer-pop/customer-pop.component';
import { CustomerInvoiceComponent } from './customer-invoice/customer-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';

@NgModule({
  declarations: [
  CustomerListComponent,
  CustomerCardComponent,
  CustomerNewComponent,
  RepDialogComponent,
  CustomerPopComponent,
  CustomerInvoiceComponent,
  InvoiceListComponent
 ],
  entryComponents: [RepDialogComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    CustomerRoutingModule,
    NgxMaskModule.forRoot()
  ]
})
export class CustomerModule { }
