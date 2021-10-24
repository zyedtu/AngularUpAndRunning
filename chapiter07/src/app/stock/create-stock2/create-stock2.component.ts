import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Stock } from '../../model/stock';

let counter=1;
@Component({
  selector: 'app-create-stock2',
  templateUrl: './create-stock2.component.html',
  styleUrls: ['./create-stock2.component.scss']
})
export class CreateStock2Component implements OnInit {

  private stock: Stock;
  public stockForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.stock = new Stock('Test ' + counter++, 'TST', 20, 10);
  }

  ngOnInit(): void {
  }

  createForm() {
    this.stockForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }
  loadStockFromServer() {
    this.stock = new Stock('Test ' + counter++, 'TST', 20, 10);
    let stockFormModel = Object.assign({}, this.stock);
    delete stockFormModel.previousPrice;
    delete stockFormModel.favorite;
    this.stockForm.setValue(stockFormModel);
  }
  patchStockForm() {
    this.stock = new Stock(`Test ${counter++}`, 'TST', 20, 10);
    this.stockForm.patchValue(this.stock);
  }
  resetForm() {
    this.stockForm.reset();
  }
  onSubmit() {
    this.stock = Object.assign({}, this.stockForm.value);
    console.log('Saving stock', this.stock);
  }

  get name() { return this.stockForm.get('name'); }
  get code() { return this.stockForm.get('code'); }
  get price() { return this.stockForm.get('price'); }

}
