import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Invoice } from '../customer.model';
import { FileUploader } from 'ng2-file-upload';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  uploadForm: FormGroup;

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  title = 'Angular File Upload';

 
  selectedFile: File = null;
  name = '';
  nameZip = '';
  progress: { percentage: number } = { percentage: 0 };
  currentFileUpload: File = null;

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['folio', 'fecha', 'fechaPago', 'Total', 'Pago', 'Acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  // accounting: Supplier[];
  invoices: Invoice[];
   invoice: Subject<Invoice[]> = new Subject();

  constructor(private customerService: CustomerService,
    private fb: FormBuilder, private http: HttpClient,
              private router: Router  ) {
                this.loadInvoice();
               }

               uploadSubmit(){
                for (let i = 0; i < this.uploader.queue.length; i++) {
                  const fileItem = this.uploader.queue[i]._file;
                  if (fileItem.size > 10000000) {
                    alert('Each File should be less than 10 MB of size.');
                    return;
                  }
                }
                for (let j = 0; j < this.uploader.queue.length; j++) {
                  const data = new FormData();
                  const fileItem = this.uploader.queue[j]._file;
                  console.log(fileItem.name);
                  data.append('file', fileItem);
                  data.append('fileSeq', 'seq'+ j);
                  data.append( 'dataType', this.uploadForm.controls.type.value);
                  this.uploadFile(data).subscribe(data => alert(data.message));
                }
                this.uploader.clearQueue();
          }

          uploadFile(data: FormData): Observable<any> {
            return this.http.post('http://localhost:8080/api/invoice/upload', data);
          }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      document: [null, null],
      type:  [null, Validators.compose([Validators.required])]
    });
  }

  /*----------- Selecciona Archivo AccountType en formato CSV para ser Enviado -------------*/
  onFileSelected(event) {
    this.progress.percentage = 0;
    this.selectedFile = <File>event.target.files[0];
    try {
      this.name = this.selectedFile.name;
      console.log(this.selectedFile.name.split('.'));
      if ( this.name.split('.')[1] !== 'xml') {
        console.log('ERROR!');
        this.cancelFile();
      // swal('Error!', 'Cancelar y seleccionar un archivo con formato XML', 'warning');

      } else {
        console.log('go ahead');

      }
    } catch (error) {
      console.log(error);
      this.cancelFile();
      // swal('Error!', 'Cancelar y seleccionar un archivo nuevo!', 'warning');
    }
}


 /*----------- Selecciona Archivo AccountType en formato ZIP para ser Enviado -------------*/
 onFileZipSelected(event) {
  this.progress.percentage = 0;
  this.selectedFile = <File>event.target.files[0];
  try {
    this.nameZip = this.selectedFile.name;
    console.log(this.selectedFile.name.split('.'));
    if ( this.nameZip.split('.')[1] !== 'xml') {
      console.log('ERROR!');
      this.cancelFile();
    // swal('Error!', 'Cancelar y seleccionar un archivo con formato ZIP', 'warning');

    } else {
      console.log('go ahead');

    }
  } catch (error) {
    console.log(error);
    this.cancelFile();
    // swal('Error!', 'Cancelar y seleccionar un archivo nuevo!', 'warning');
  }
}


 /*----------- Envia Archivo AccountType en formato CSV al Servidor -------------*/
 onUploadTxtFile() {
  const fd = new FormData();
  try {
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFile;
    this.customerService.sendXmlCustomerInvoice(this.currentFileUpload).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          // swal('Mensaje del Servidor...', `La transaccion fue exitosa`, 'success');

          this.selectedFile = null;
          this.name = null;
          this.loadInvoice();
          this.progress.percentage = 0;

            // this.router.navigate(['/suppliers']);
        }

      }, error => {
        // console.log(error, '/', error.error);
          // swal('Mensaje del Servidor:', `Error!!...El numero de la Factura ya existe `, 'error');
       }
      );


  } catch (error) {
    // swal('Error!', 'Seleccionar un archivo XML para ser enviado!', 'warning');
  }

}

/*----------------------- Http carga la Invoice que fue enviada -----------------------*/
    loadInvoice() {
      this.customerService.getAllInvoiceCustomer().subscribe(resp => {
        this.invoices = resp;
        if (resp !== null ) {

          this.invoice.next(this.invoices);
          console.log('INVOICES ', this.invoices);
          this.listData = new MatTableDataSource(this.invoices);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          this.progress.percentage = 0;
        } else {
          // swal('Error!', 'No Existen facturas!', 'warning');
        }
      });

    }



 /*----------- Cancela enviar Archivo -------------*/
 cancelFile() {
  this.selectedFile = null;
  this.name = null;
  console.log('Cancel File', this.selectedFile);
}

applyFilter() {
  this.listData.filter = this.searchKey.trim().toLowerCase();
}

onSearchClear() {
  this.searchKey = '';
  this.applyFilter();
}


}
