export class Stock {
  favorite: boolean = false;
  constructor(public id: number,
              public name: string,
              public code: string,
              public price: number,
              public previousPrice: number,
              public exchange: string) {}
  get isPositiveChange(): boolean {
      return this.price >= this.previousPrice;
  }
}
