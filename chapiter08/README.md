                                            #Angular Services#

# What Are Angular Services (qu'est ce c'est Sercices dans Angular): 
Jusqu'à présent, nous avons principalement travaillé avec des composants angulaires. Les composants, pour récapituler rapidement, sont chargés de décider quelles données afficher et comment les rendre et les afficher dans l'interface utilisateur. Nous lions nos données des composants à notre interface utilisateur et lions nos événements de l'interface utilisateur aux méthodes des composants pour autoriser et gérer les interactions des utilisateurs. C'est-à-dire que les composants d'Angular sont notre couche de présentation et doivent être impliqués et se concentrer sur les aspects de présentation des données.     
Mais si les composants sont notre couche de présentation, cela soulève la question de savoir ce qui devrait être responsable de la récupération réelle des données et de la logique métier commune dans une application Angular. C'est là qu'interviennent les services angulaires. Les services angulaires sont cette couche commune à votre application, qui peut être réutilisée dans divers composants. En règle générale, vous créez et utilisez des services angulaires lorsque:   
* Vous avez besoin de récupérer ou envoyer des données à votre serveur. 
* Vous devez encapsuler une logique d'application qui n'est pas spécifique à un seul composant, ou une logique qui peut être réutilisée entre les composants.    
* Vous devez partager des données entre les composants, en particulier entre les composants qui peuvent ou non se connaître. **Les services** par défaut sont des **singletons** dans votre application, ce qui vous permet de stocker l'état et d'y accéder à travers divers composants.      

# Creating Our Own Angular Service (Créer notre propre service angulaire): 
Au lieu de parler dans l'abstrait, creusons dans un code réel afin que nous puissions mieux comprendre le concept de services. Ce que nous allons faire, c'est nous appuyer sur l'exemple sur lequel nous avons travaillé jusqu'à présent et l'étendre à l'aide des services Angular. Nous essaierons d'accomplir les choses suivantes dans notre application Stock:    
* Récupérez la liste des stocks à afficher à partir d'un service, au lieu de la coder en dur dans le composant.  
* Lorsque nous créons un stock, nous l'enverrons au service.   
* Lorsque nous créons un stock, nous voulons qu'il apparaisse dans notre liste de stocks.    

### Digging into the Example (Creuser dans un exemple): 
Modifions le code de tempalt *stock-item.component.html*:  

    <div class="stock-container">
        <div class="name">{{stock.name + ' (' + stock.code + ')'}}</div>
        <div class="exchange">{{stock.exchange}}</div>
        <div class="price" [class.positive]="stock.isPositiveChange" [class.negative]="!stock.isPositiveChange">$
            {{stock.price}}</div>
        <button (click)="onToggleFavorite($event)" *ngIf="!stock.favorite">Add to Favorite</button>
        <button (click)="onToggleFavorite($event)" *ngIf="stock.favorite">Remove from Favorite</button>
    </div>
Nous venons d'ajouter un div pour afficher l'échange de l'action, et un bouton pour afficher Supprimer des favoris si l'action est déjà favorite.    

Ensuite, créons le squelette du StockListComponent avant d'essayer de créer et d'intégrer notre StockService. Nous pouvons générer le squelette en exécutant:  

    > ng g c stock/stock-list
Nous allons modifier le fichier *stock-list.component.ts*: 

    export class StockListComponent implements OnInit {

    public stock: Stock[];
    constructor() { }

    ngOnInit(): void {
        this.stock = [
        new Stock('Test Stock Company', 'TSC', 85, 80, 'NASDAQ'),
        new Stock('Second Stock Company', 'SSC', 10, 20, 'NSE'),
        new Stock('Last Stock Company', 'LSC', 876, 765, 'NYSE')
        ];
    }

      onToggleFavorite(stock: Stock) {
        console.log('Favorite for stock ', stock, ' was triggered');
        stock.favorite = !stock.favorite;
      }
    }
Il y a quelques points à noter ici, mais rien de fondamentalement nouveau ou révolutionnaire jusqu'à présent: 
* Nous avons déclaré un tableau de stcok au niveau de la classe et l'avons initialisé avec des valeurs par défaut dans le bloc ngOnInit.     
* Nous avons une fonction ToggleFavorite qui enregistre le stock et change son état favori.    

Regardons maintenant son modèle correspondant, dans *stock-list.component.html*:   

    <app-stock-item *ngFor="let stock of stocks" [stock]="stock" 
        (toggleFavorite)="onToggleFavorite($event)">
    </app-stock-item>
Dans le modèle, nous parcourons simplement tous les stocks et affichons une instance de StockItemComponent pour chacun. Nous demandons au StockItemComponent de déclencher le onToggleFavorite chaque fois que quelqu'un clique sur le bouton Ajouter aux favoris ou Supprimer des favoris dans l'article en stock.      

Maintenant, enfin, regardons ce qu'il faut pour créer un StockService très simple et trivial. Nous pouvons à nouveau générer le squelette de base du service à l'aide de la CLI angulaire comme suit:   

    > ng g service services/stock
Cela générera deux fichiers, un squelette stock-service.ts et un test factice pour celui-ci dans stockservice.spec.ts.    

    @Injectable({
    providedIn: 'root'
    })
    export class StockService {

    constructor() { }
    }
La squelette resemble une classe avec un décorateur @Injectable, Avec le décorateur Injectable, Angular se chargera de les injecter dans notre service.   

Nous laisserons le décorateur intact, en respectant les meilleures pratiques. Et très bientôt, dès le prochain chapitre, nous en aurons besoin de toute façon.   

Passons maintenant au cœur du travail, à savoir les données que le StockService doit fournir. Les composants en générale qui demanderent à un service de lui fournir des données (ou une partie des données). C'est au service de décider comment et où récupérer les données, qu'il s'agisse d'un service Web via des appels HTTP, d'un stockage local ou d'un cache, ou même de renvoyer des données fictives, comme nous le ferons dans un instant. Plus tard, si nous voulons changer la source, nous pouvons le faire à un seul endroit sans toucher aucun des composants, tant que notre signature API reste la même.     

Définissons notre StockService pour continuer à renvoyer des données fictives. Nous allons éditer le fichier stock.service.ts comme suit:  

    export class StockService {

    private stocks: Stock[];
    constructor() {
        this.stocks = [
        new Stock('Test Stock Company', 'TSC', 85, 80, 'NASDAQ'),
        new Stock('Second Stock Company', 'SSC', 10, 20, 'NSE'),
        new Stock('Last Stock Company', 'LSC', 876, 765, 'NYSE')
        ];
    }

    getStocks(): Stock[] {
        return this.stocks;
    }

    createStock(stock: Stock) {
        let foundStock = this.stocks.find(each => each.code === stock.code);
        if (foundStock) {
        return false;
        }
        this.stocks.push(stock);
        return true;
    }
    
     toggleFavorite(stock: Stock) {
        let foundStock = this.stocks.find(each => each.code === stock.code);
        foundStock.favorite = !foundStock.favorite;
     }
    }
Bien qu'il semble que nous ayons ajouté beaucoup de code, si nous creusons dedans, il n'y a rien de spécifique à Angular dans le code que nous avons ajouté. La plupart du code ajouté est une fonctionnalité commerciale que nous avons définie et appliquée via StockService. Parcourons rapidement les principales fonctionnalités que nous avons introduites dans le service:     
* Nous avons déplacé notre initialisation de la liste fictive des stocks vers le constructeur du StockService, en l'initialisant avec des valeurs factices pour fournir un état initial à notre interface utilisateur lorsqu'elle est rendue.   
* Nous avons défini une méthode getStocks() très simple qui renvoie simplement la liste actuelle des stock.   
* La méthode createStock ajoute simplement un stock à notre liste de stock. Il vérifie d'abord si le stock existe déjà (en utilisant le code sur le stock pour vérifier l'unicité), et sort plus tôt si c'est le cas. S'il n'est pas trouvé, il ajoute le stock passé à notre liste de stocks.   
* Enfin, nous avons un toggleFavorite, qui trouve simplement le stock transmis dans notre tableau, puis bascule l'état de la clé préférée dessus.   

Maintenant que nous avons défini notre service, voyons ce qu'il faut faire pour pouvoir l'utiliser dans nos composants. Avant de pouvoir commencer à l'injecter dans nos composants, nous devons définir comment ce service sera fourni et à quel niveau. Nous pouvons définir cela au niveau StockListComponent, au niveau AppComponent ou au niveau AppModule. Nous verrons quelle est la différence dans un instant, mais en attendant, définissons-la au niveau du module.    

Modifions le fichier src/app/app.module.ts pour définir le fournisseur comme suit:  

    @NgModule({
    declarations: [
        AppComponent,
        StockItemComponent,
        StockListComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [StockService], // ligne 19 
    bootstrap: [AppComponent]
    })
    export class AppModule { }
* ligne 19: Enregistrer StockService dans le tableau providers.   

Le tableau des fournisseurs du module Angular indique à Angular de créer une instance singleton du service et de la rendre disponible pour toute classe ou composant qui le demande. Lorsque nous l'enregistrons au niveau du module, cela signifie que tout composant du module qui demande le service recevra exactement la même instance qui lui sera injectée.    
TODO page 171

### An Introduction to Dependency Injection ():   
### Angular and Dependency Injection ():  
# RxJS and Observables: Moving to Asynchronous Operations ():    
