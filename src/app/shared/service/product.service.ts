import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from "../Model/Product";

@Injectable({
    providedIn: 'root'
  })

export class ProductService{
    private API_URL = 'http://localhost:8089/Products/ListProducts' ;

    private API_URL1 = 'http://localhost:8089/Products' ;

    constructor(private http: HttpClient) { }

    getAllProduct(): Observable<Product[]> {
        return this.http.get<Product[]>(this.API_URL);
      }
    
      addProduct(product : Product) {
        return this.http.post(`${this.API_URL1}/addProduct`, product)
      }
    
      editProduct(productId : number ,product : Product){
        return this.http.put(`${this.API_URL1}/${productId}/updateProduct`, product)
      }
      deleteProduct(productId : number){
        return  this.http.delete(`${this.API_URL1}/${productId}/deleteProduct`)
      }
}