import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Payment} from "../Model/Payment";
// import { Payment } from './payment'; // Supposant que vous avez déjà créé l'interface Payment

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8082/payment/all'; // Mettez l'URL de votre API Spring Boot ici


  constructor(private http: HttpClient) { }

  getPayments(){
    return this.http.get(this.apiUrl); // Renvoie un Observable qui contient les données de la réponse JSON
  }
  private apiUrl1 = 'http://localhost:8081/payment'; // Mettez l'URL de votre API Spring Boot ici

  addPayment(payment: any): Observable<any> {
    return this.http.post(this.apiUrl1, payment); // Renvoie un Observable qui contient les données de la réponse JSON
  }

  deletePayment(id: any): Observable<Payment> {
    return this.http.delete<Payment>(this.apiUrl + '/' + id); // Renvoie un Observable qui contient les données de la réponse JSON
  }

}
