import { Component, OnInit } from '@angular/core';
import { Stock } from './model/stock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'bookAngularUpAndRunning';
  
  public stock: Stock;

  ngOnInit(){
    this.stock = new Stock('Test Stock Company', 'TSC', 85, 80);
  }
}
