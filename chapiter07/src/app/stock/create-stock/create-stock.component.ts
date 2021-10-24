import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.scss']
})
export class CreateStockComponent implements OnInit {

  public stockForm: FormGroup; // ligne 11
  constructor(private fb: FormBuilder) { // ligne 12
    this.createForm();
  }

  createForm(): void {
    this.stockForm = this.fb.group({  // ligne 17
      name: [null, Validators.required],  // ligne 18
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Name Control Value', this.stockForm.value);
  }

  get name() { return this.stockForm.get('name'); }
  get code() { return this.stockForm.get('code'); }
  get price() { return this.stockForm.get('price'); }

}
