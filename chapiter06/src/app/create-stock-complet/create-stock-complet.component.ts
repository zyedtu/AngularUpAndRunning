import { Component, OnInit } from '@angular/core';
import { Stock } from '../model/stock';

@Component({
  selector: 'app-create-stock-complet',
  templateUrl: './create-stock-complet.component.html',
  styleUrls: ['./create-stock-complet.component.scss']
})
export class CreateStockCompletComponent implements OnInit {

  public stock: Stock;
  public confirmed : boolean = false;

  constructor() {
    this.stock = new Stock('test', '', 0, 0, 'NASDAQ');
   }

  ngOnInit(): void {
  }

  setStockPrice(price) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  createStock() {
    console.log('Creating stock ', this.stock);
    console.log('confirmed : ', this.confirmed);

  }

}
