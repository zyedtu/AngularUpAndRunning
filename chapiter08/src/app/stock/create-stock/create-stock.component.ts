import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Stock } from 'src/app/model/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.scss']
})
export class CreateStockComponent implements OnInit {

  public stockForm: FormGroup;
  public stock: Stock;
  public message: string = '';
  public exchanges: string[] = ['NYSE', 'NASDAQ', 'OTHER'];
  constructor(private fb: FormBuilder,
    private stockSrv: StockService) {
    this.stock = new Stock('', '', 0, 0, 'NASDAQ');
    this.createForm();
  }

  createForm(): void {
    this.stockForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]],
      exchange: null
    });
  }

  ngOnInit(): void {
  }

  Create() {
    if (this.stockForm.valid) {
      let created = this.stockSrv.createStock(this.stockForm.value);
      if (created) {
        this.message = 'Successfully created stock with stock code: '
          + this.stock.code;
        this.stock = new Stock('', '', 0, 0, 'NASDAQ');
      } else {
        this.message = 'Stock with stock code: ' + this.stock.code
          + ' already exists';
      }
    } else {
      console.error('Stock form is in an invalid state');
    }
  }

  get name() { return this.stockForm.get('name'); }
  get code() { return this.stockForm.get('code'); }
  get price() { return this.stockForm.get('price'); }

}
