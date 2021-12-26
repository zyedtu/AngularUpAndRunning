import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { LoginComponent } from './user/login/login.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockDetailsComponent } from './stock/stock-details/stock-details.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { AuthGuard } from './guards/auth.guard';
import { StockLoadResolver } from './resolvers/stock-load.resolver';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path: 'stock/item', component: StockItemComponent, canActivate: [AuthGuard]},
  {path: 'stock-list', component: StockListComponent, canActivate: [AuthGuard]},
  {path: 'stock/:id', component: StockDetailsComponent,
   canActivate: [AuthGuard],
   resolve: {stock: StockLoadResolver}},
  { path: '**', component: PageErrorComponent }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
    ],
})
export class AppRoutesModule { }
