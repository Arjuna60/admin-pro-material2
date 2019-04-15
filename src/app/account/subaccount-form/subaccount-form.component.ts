import { Component, OnInit } from '@angular/core';
import { SubaccountFormService } from '../service/subaccount-form.service';
import { MatDialogRef } from '@angular/material';
import { AccountService } from '../service/account.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subaccount-form',
  templateUrl: './subaccount-form.component.html',
  styleUrls: ['./subaccount-form.component.css']
})
export class SubaccountFormComponent implements OnInit {


  constructor(public subaccountService: SubaccountFormService,
    public dialogRef: MatDialogRef<SubaccountFormComponent>,
    private accountService: AccountService,
    private snackBarService: SnackbarService) {}


  ngOnInit() {
  }


  onClear() {
    this.subaccountService.form.reset();
    // this.onClose();

  }

  onSubmit() {
    // console.log('SUBMIT ', this.subaccountService.getForm());
       // tslint:disable-next-line:no-unused-expression
      //  this.subaccountService.account;
      //  this.subaccountService.form.get('accountType.id').setValue(this.subaccountService.account.id);
       const data = JSON.stringify(this.subaccountService.form.value);
       console.log('DATA ', data);
       this.accountService.createSubAccount(data).subscribe(res => {
        console.log('Result ', res);
      });
      //  console.log('SUBMIT ', this.subaccountService.form);
       this.snackBarService.success(':: Enviado con éxito!');
       this.onClose();
    }

    onClose() {
      this.subaccountService.form.reset();
      // this.subaccountService.initializeFormGroup(this.account);
      this.dialogRef.close();
    }

}
