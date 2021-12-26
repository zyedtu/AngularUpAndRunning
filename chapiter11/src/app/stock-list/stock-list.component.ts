import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { StockService } from '../services/stock.service';
import { Stock } from '../model/stock';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {

  public stocks: Stock [];

  constructor(private stockSrv: StockService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('Page No. : ', this.activatedRoute.snapshot.queryParamMap.get('page'));
    this.stockSrv.getAllStock().subscribe(
      (data: Stock []) => {
        this.stocks = data;
      }
    );
  }

  goDetailList(id: number) {
    this.router.navigate(['/stock', id]);
  }
}
