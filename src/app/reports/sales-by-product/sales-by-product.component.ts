import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { SalesByProduct } from '../models/reports.models';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-sales-by-product',
  templateUrl: './sales-by-product.component.html',
  styleUrls: ['./sales-by-product.component.css']
})
export class SalesByProductComponent implements OnInit {

  dateCtrlIni: FormControl;
  dateCtrlFin: FormControl;
  searchKey: string;

  minDate = new Date();
  salesByProduct: SalesByProduct[];
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['cantidad', 'descripcion', 'claveUnidad', 'avgValue', 'importe',  'Acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(reportservice: ReportService) {

      reportservice.getSalesByProduct().subscribe(resp => {

          this.salesByProduct = resp;
            console.log('SALES BY PRODUCT ', this.salesByProduct);
            this.listData = new MatTableDataSource(this.salesByProduct);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;
            console.log('List Data ', this.listData.data.length);
      });

  }

  ngOnInit() {
    this.dateCtrlIni = new FormControl('', [Validators.required]);
    this.dateCtrlFin = new FormControl('', [Validators.required]);

  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

}
