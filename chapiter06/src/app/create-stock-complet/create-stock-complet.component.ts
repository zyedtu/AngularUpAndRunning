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
  public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];

  constructor() {
    this.stock = new Stock('', '', 0, 0, 'NASDAQ');
   }

  ngOnInit(): void {
  }

  setStockPrice(price) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  createStock(stockForm) {
    console.log('Stock form', stockForm);
    if (stockForm.valid) {
      console.log('Creating stock ', this.stock);
    } else {
      console.error('Stock form is in an invalid state');
    }
  }

}
