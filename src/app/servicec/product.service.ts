import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  constructor(private http:HttpClient) { }

  getProduct(url):Observable<any>{
    return this.http.get(url);
  }

  getProductById(url,id):Observable<any>{
    return this.http.get(url+'/'+id);
  }
}
