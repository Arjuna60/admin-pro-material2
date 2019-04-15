import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { CustomerNewComponent } from './customer-new/customer-new.component';
import { CustomerPopComponent } from './customer-pop/customer-pop.component';
import { CustomerInvoiceComponent } from './customer-invoice/customer-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  },
  {
    path: 'info',
    component: CustomerCardComponent
  },
  {
    path: 'new',
    component: CustomerNewComponent
  },
  {
    path: 'invoice',
    component: InvoiceListComponent
  },
  {path: 'invoices/:id',
   component: CustomerInvoiceComponent, data: {titulo: 'Facturacion del Cliente'}
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
