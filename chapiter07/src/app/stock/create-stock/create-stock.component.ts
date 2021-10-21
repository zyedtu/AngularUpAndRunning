import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.scss']
})
export class CreateStockComponent implements OnInit {

  public nameControl = new FormControl();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Name Control Value', this.nameControl.value);
  }

}
