import { Component, OnInit } from '@angular/core';
import {InvoiceService} from "../shared/service/invoice.service";
import {Invoice} from "../shared/Model/Invoice";
import { jsPDF } from "jspdf";

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  public tableData1: TableData;
  public tableData2: TableData;
  isUpdate:boolean=false;
  invoiceList : any;

  invoice:Invoice = new Invoice();
  searchForm: any;
  invoices: Invoice[];

  constructor(private invoiceService:InvoiceService) { }

  showModal=false;

  ngOnInit(): void {
    this.getAllInvoice();
    this.closePopupForUpdate();
    this.closePopupForCreate();
  }

  getAllInvoice(){
    return this.invoiceService.getAllInvoices().subscribe(res => this.invoiceList = res);
    }

    public deleteInvoice(id:number) {
      this.invoiceService.deleteInvoice(id).subscribe(() => {
          console.log("Invoice deleted");
          this.getAllInvoice();

      });
  }

  openPopupForUpdate(invoicetoupdate:any){
    this.isUpdate=true;
    this.invoice=invoicetoupdate;
    this.showModal = true;
}
closePopupForUpdate(){
    this.showModal = false;
}
openPopupForCreate(){
    this.isUpdate=false;
    this.showModal = true;
}
closePopupForCreate(){
    this.showModal = false;
}

generatePdf(invoice: Invoice) {
  const doc = new jsPDF();
  // Ajouter le code de génération de PDF ici
    doc.text(`Total Cost: ${invoice.totalCost}`, 10, 20);
    doc.text(`Description: ${invoice.description}`, 10, 30);
    doc.text(`Payment Status: ${invoice.paymentStatus}`, 10, 40);
    doc.text(`Quantity: ${invoice.quantity}`, 10, 50);
    doc.text(`Price: ${invoice.price}`, 10, 60);
  doc.save('Invoice.pdf');
}

onSubmit() {
  this.invoiceService.addInvoice(this.invoice).subscribe(() => {
    this.generatePdf(this.invoice);
  });
}


exportToCsv(): void {
  this.invoiceService.exportToCsv();
}

}
