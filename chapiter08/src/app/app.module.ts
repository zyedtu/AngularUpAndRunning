import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';

import { StockService } from './services/stock.service';

@NgModule({
  declarations: [
    AppComponent,
    StockItemComponent,
    StockListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
