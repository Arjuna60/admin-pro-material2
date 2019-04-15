import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountListComponent } from './account-list/account-list.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubaccountFormComponent } from './subaccount-form/subaccount-form.component';
import { SubaccountListComponent } from './subaccount-list/subaccount-list.component';

@NgModule({
  declarations: [AccountListComponent, SubaccountFormComponent, SubaccountListComponent ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ],
  entryComponents: [SubaccountFormComponent]
})
export class AccountModule { }
