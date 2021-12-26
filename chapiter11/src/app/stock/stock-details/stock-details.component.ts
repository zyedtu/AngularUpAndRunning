import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stock } from 'src/app/model/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {

  stock: Stock;
  constructor(private stockSrv: StockService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id');
    // this.stockSrv.getById(id).subscribe(
    //   (data: Stock) => { this.stock = data; }
    // );
    this.route.data.subscribe((data: {stock: Stock}) => {
      console.log(data.stock.code)
      this.stock = data.stock;
      debugger;
      });
  }

}
