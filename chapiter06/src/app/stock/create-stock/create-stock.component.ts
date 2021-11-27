import { Component, OnInit } from '@angular/core';

import { Stock } from '../../model/stock';
@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.scss']
})
export class CreateStockComponent implements OnInit {

  stock: Stock;
  constructor() { }

  ngOnInit(): void {
    this.stock = new Stock('test', '', 0, 0);
  }

}
