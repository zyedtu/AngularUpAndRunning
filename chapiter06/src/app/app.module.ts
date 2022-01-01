import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { CreateStockCompletComponent } from './create-stock-complet/create-stock-complet.component';

@NgModule({
  declarations: [
    AppComponent,
    StockItemComponent,
    CreateStockComponent,
    CreateStockCompletComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
