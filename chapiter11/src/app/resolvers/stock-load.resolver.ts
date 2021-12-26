import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Stock } from '../model/stock';
import { StockService } from '../services/stock.service';

@Injectable({
  providedIn: 'root'
})
export class StockLoadResolver implements Resolve<Stock> {
  constructor(private stocksrv: StockService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Stock> {
    const id = route.paramMap.get('id');
    return this.stocksrv.getById(id);
  }
}
