import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getProductRecords() {
    return new Promise((resolve, reject) => {
      this.httpClient.get(`https://dummyjson.com/products`)
        .subscribe(
          (response) => { resolve(response); },
          (errors) => { reject(errors) }
        );
    })
  }
}
