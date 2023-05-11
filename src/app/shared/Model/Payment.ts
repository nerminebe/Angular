import {PaymentStatus} from "./PaymentStatus";
import {randomInt} from "crypto";

export class Payment {
    _id: any;
    paymentMethod : any;
    paymentStatus=PaymentStatus;
    amount : any;
    paymentDate = new Date();
    userID:any;
    orderId : any;
    // orderId = "NO05114";
}
