import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer-pop',
  templateUrl: './customer-pop.component.html',
  styleUrls: ['./customer-pop.component.css']
})
export class CustomerPopComponent implements OnInit {

  constructor(private service: CustomerService) {
    this.service.initializeFormGroup();
   }

  departments = [
    { id: 1, value: 'Dep 1' },
    { id: 2, value: 'Dep 2' },
    { id: 3, value: 'Dep 3' }];

  ngOnInit() {
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    console.log('Form ', this.service.form);

  }
}
