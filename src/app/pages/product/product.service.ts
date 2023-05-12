import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IncomeForm} from "../income/model/income.form";
import {IProduct} from "./model/i-product";
import {ProductForm} from "./create/model/product.form";
import {ProductData} from "./list/model/product.data";

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getApplicableProducts(form: IncomeForm): Observable<Array<IProduct>> {
    return this.http.post<Array<IProduct>>('/api/product', form)
  }

  public upsert(form: ProductForm): Observable<void> {
    return this.http.post<void>('/api/product/new', form);
  }

  public getAll(): Observable<Array<ProductData>> {
    return this.http.get<Array<ProductData>>('/api/product/all');
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/product/${id}`);
  }

  public getOne(id: number): Observable<ProductForm> {
    return this.http.get<ProductForm>(`/api/product/${id}`);
  }

}
