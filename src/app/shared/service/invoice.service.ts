import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Invoice} from "../Model/Invoice";

@Injectable({
    providedIn: 'root'
  })

export class InvoiceService {

    private API_URL = 'http://localhost:8089/invoices/ListInvoices';
    
    private API_URL1 = 'http://localhost:8089/invoices';

  constructor(private http: HttpClient) { }

  getAllInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.API_URL);
  }
  addInvoice(invoice : Invoice) {
    return this.http.post(`${this.API_URL1}/addInvoice`, invoice)
  }
  
  editInvoice(invoiceId : number,invoice : Invoice){
    return this.http.put(`${this.API_URL1}/${invoiceId}/updateInvoice`, invoice)
  }
  deleteInvoice(invoiceId : number){
    return  this.http.delete(`${this.API_URL1}/${invoiceId}/deleteInvoice`)
  }

  exportToCsv(): void {
    this.http.get(`${this.API_URL1}/invoices/export/csv`, { responseType: 'text' }).subscribe(csv => {
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'invoices.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => console.error(error));
  }

}