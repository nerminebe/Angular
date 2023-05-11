import { Component, OnInit } from '@angular/core';
import {PaymentService} from "../shared/service/payment.service";
import {Payment} from "../shared/Model/Payment";
import {PaymentStatus} from "../shared/Model/PaymentStatus";

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
    public tableData1: TableData;
    public tableData2: TableData;
    isUpdate:boolean=false;
    paymentList : any;
    selectedPaymentStatus: String[] = [
        "CreditCard",
        "CashOnDeleviry",
        "PayPal",
        "ApplePay"
    ];
    paymentStatusOptions: String[] = [
        "CreditCard",
        "CashOnDeleviry",
        "PayPal",
        "ApplePay"
    ];

    // payment:{
    //     id:any,
    //     paymentMethod:any,
    //     paymentStatus:any,
    //     amount:any,
    //     paymentDate:any,
    //     order:any
    // };

    payment:Payment = new Payment();
   // selectedValue: string;



    constructor(private paymentService : PaymentService) { }
    showModal = false;

    ngOnInit() {
      this .getAllPayment();
        this.closePopupForUpdate();
        this.closePopupForCreate();



    }

    // onSelectedValueChange(event) {
    //     console.log(this.selectedValue);
    // }
    date: any;


  getAllPayment(){
  return this.paymentService.getPayments().subscribe(res => this.paymentList = res);
  }
    public deletePayment(id:number) {
        this.paymentService.deletePayment(id).subscribe(() => {
            console.log("Payment deleted");
            this.getAllPayment();

        });
    }

    openPopupForUpdate(paymenttoupdate:any){
        this.isUpdate=true;
        this.payment=paymenttoupdate;
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
    onSubmit() {
        this.paymentService.addPayment(this.payment).subscribe((data) =>{

            data = new Payment();
            console.log(data);

            window.location.href = 'https://buy.stripe.com/test_28o9AE84E74A5bO5kk';

        } );
           //this.payment = new Payment();
           //  this.getAllPayment();
        // },error => { console.error('Error',error);
        // });
        // this.showModal = false;


    }
    getCurrentDate(): Date {
        return new Date();
    }


}
