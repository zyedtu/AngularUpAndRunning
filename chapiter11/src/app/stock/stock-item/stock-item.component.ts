import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Stock } from 'src/app/model/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockItemComponent implements OnInit {

  public stock: Stock;

  constructor(private stockSrv: StockService) {
   }

  ngOnInit(): void {
    this.stock = new Stock(1,'Test Stock Company', 'TSC', 85, 80, 'NASDAQ');
  }

  onToggleFavorite(event) {
    console.log('We are toggling the favorite state for this stock', event);
    this.stock.favorite = true;
  }

  changeStockPrice() {
    this.stock.price += 5;
  }

}
