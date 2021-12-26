import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Stock } from '../model/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  stock: Stock;
  constructor(private http: HttpClient) { }

   getAllStock(): Observable<Stock[]> {
    return this.http.get<Stock[]>('../../assets/data/stocks.json');
   }

   getById(id: any): Observable<Stock> {
      return this.http.get<Stock>(`../../assets/data/stock${id}.json`);
   }
}
