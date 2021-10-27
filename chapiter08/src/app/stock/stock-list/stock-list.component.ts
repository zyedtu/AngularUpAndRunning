import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Stock } from '../../model/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {

  public stocks: Stock[];
  constructor(private stockSrv: StockService) { }

  ngOnInit(): void {
    this.stockSrv.getStocks().subscribe( res => {
      this.stocks = res;
    });
  }

  onToggleFavorite(stock: Stock) {
    console.log('Favorite for stock ', stock, ' was triggered');
    this.stockSrv.toggleFavorite(stock);
  }

}
