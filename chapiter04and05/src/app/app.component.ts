import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/model/stock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works !';

  public stock: Stock;
  private counter: number = 1;

  ngOnInit(): void {
    this.stock = new Stock('Test Stock Company', 'TSC', 85, 80);
  }

  onToggleFavorite(stock: Stock) {
    console.log('Favorite for stock ', stock, ' was triggered');
    this.stock.favorite = !this.stock.favorite;
  }

  changeStockObject() {
    // Cela mettra à jour la valeur dans le composant d'article en stock 
    // car nous créons une nouvelle référence pour l'entrée de stock.
    this.stock = new Stock('Test Stock Company - ' + this.counter++,
    'TSC', 85, 80);
  }
    changeStockPrice() {
    // Cela ne mettra pas à jour la valeur dans le composant de l'article 
    // en stock car il modifie la même référence et angulaire ne la vérifiera
    // pas dans la stratégie de détection de changement OnPush.
    this.stock.price += 10;
    console.log('changeStockPrice', this.stock.price);
  }

}
