import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-create-stock3',
  templateUrl: './create-stock3.component.html',
  styleUrls: ['./create-stock3.component.scss']
})
export class CreateStock3Component implements OnInit {

  public stockForm: FormGroup;
  private stock: Stock;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void { }

  createForm(): void {
    this.stockForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]],
      notablePeople: this.fb.array([]) // ligne 26
    });
  }

  get notablePeople(): FormArray { // ligne 30
    return this.stockForm.get('notablePeople') as FormArray;
  }
  
  addNotablePerson() { // ligne 33
    this.notablePeople.push(this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required]
    }))
  }

  removeNotablePerson(index: number) { // ligne 40
    this.notablePeople.removeAt(index);
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
