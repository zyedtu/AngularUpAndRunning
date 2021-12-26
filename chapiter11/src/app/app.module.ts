import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { LoginComponent } from './user/login/login.component';
import { AppRoutesModule } from './app-routes.module';
import { StockService } from './services/stock.service';
import { PageErrorComponent } from './page-error/page-error.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StockDetailsComponent } from './stock/stock-details/stock-details.component';

@NgModule({
  declarations: [
    AppComponent,
    StockItemComponent,
    LoginComponent,
    PageErrorComponent,
    StockListComponent,
    StockDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [UserService, StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
