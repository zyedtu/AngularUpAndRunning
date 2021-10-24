import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStock3Component } from './create-stock3.component';

describe('CreateStock3Component', () => {
  let component: CreateStock3Component;
  let fixture: ComponentFixture<CreateStock3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStock3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStock3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
