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
* Nous avons déclaré un tableau de stock au niveau de la classe et l'avons initialisé avec des valeurs par défaut dans le bloc ngOnInit.     
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
Nous aurions pu ignorer l'étape d'ajout manuel du service au module en demandant à la CLI angulaire de l'effectuer. La CLI angulaire ne sait pas à quel niveau le service est censé fonctionner, donc à nous de lui dire dans quel module sera enregisté en tapant cette commmande: 

  > ng g service services/stock --module=app        

Cela aurait à la fois généré le service et enregistré le fournisseur dans l'AppModule.     
À ce stade, nous sommes prêts à commencer à utiliser le service, nous allons donc d'abord l'utiliser dans le StockListComponent nouvellement créé. Modifions le fichier stocklist.component.ts comme suit:

    export class StockListComponent implements OnInit {

        public stocks: Stock[];
        constructor(private stockSrv: StockService) { } // ligne 13

        ngOnInit(): void {
            this.stocks = this.stockSrv.getStocks(); // ligne 16
        }

        onToggleFavorite(stock: Stock) {
            console.log('Favorite for stock ', stock, ' was triggered');
            this.stockSrv.toggleFavorite(stock); // ligne 21
        }
    }    
  
* ligne 13: Injecter le StockService dans le composant.   
* ligne 16: Utilisez le StockService pour obtenir la liste des stocks.  
* ligne 21:  Utilisez StockService pour basculer le statut de favori sur un stock.   

Il s'agit de notre premier exemple d'injection et d'utilisation d'un service, alors examinons-le étape par étape:
* Nous pouvons injecter n'importe quel service que nous voulons dans notre composant simplement en l'ajoutant comme paramètre dans notre constructeur. Dans ce cas, nous avons déclaré une instance privée de StockService avec le nom stockService. Le nom lui-même n'a pas d'importance; Angular utilise la définition de type pour déterminer quel service injecter. Pour tout ce que nous nous soucions, nous pourrions même appeler l'instance du service xyz (pas que vous devriez !), et il serait toujours injecté correctement.    
* Nous appelons simplement les méthodes que nous voulons sur notre service via notre instance (comme stockService.getStocks() ou stockService.toggleFavorite()) au bon moment. Nous initialisons notre liste de stocks, et passons l'appel bascule au service. Notez que nous devons accéder au service via une variable d'instance et que nous ne pouvons pas y accéder directement (c'est-à-dire que **nous devons appeler this.stockService** et que nous ne pouvons pas utiliser directement stockService).    

Continuons avec les modifications mineures apportées au CreateStockComponent pour terminer l'intégration du service. Tout d'abord, nous allons ajouter un message simple en haut du modèle CreateStockComponent, pour afficher un message à l'utilisateur si le stock a été créé avec succès ou s'il y a eu une erreur lors de la création. Nous allons éditer *createstock.component.html* comme suit:

    <h2>Create Stock Form</h2>
    <div *ngIf="message">{{message}}</div> <!-- linge 2 -->
    <div class="form-group">
        <!-- Rest of the form omitted for brevity -->
        <!-- No change from the base code -->
    <div/>
* Ligne 12: on affiche un message s'il existe.   

Maintenant, nous pouvons modifier le composant dans createstock.component.ts pour intégrer StockService:   

    export class CreateStockComponent implements OnInit {

    public stockForm: FormGroup;
    public stock: Stock;
    public message: string = ''; // ligne 15
    public exchanges: string[] = ['NYSE', 'NASDAQ', 'OTHER'];
    constructor(private fb: FormBuilder,
        private stockSrv: StockService) { // ligne 18
        this.stock = new Stock('', '', 0, 0, 'NASDAQ');
        this.createForm();
    }
    ........
    Create() {
        if (this.stockForm.valid) {
        let created = this.stockSrv.createStock(this.stockForm.value); // ligne 37
        if (created) { // ligne 38
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
    ......
    }
* ligne 15: Ajout du champ message pour afficher les messages de réussite et d'erreur.    
* ligne 18: Injection de service stockSrv dans le composant.   
* ligne 37: Appelez stockSrv.createStock lorsque le formulaire est soumis.   
* ligne 38: Traiter les scénarios de réussite et d'erreur lors de la création du stock.     

### An Introduction to Dependency Injection ():   
TODO
### Angular and Dependency Injection ():  
TODO
# RxJS and Observables: Moving to Asynchronous Operations ():    
Le dernier changement que nous apporterons avant de conclure ce chapitre particulier sur les services est de travailler avec du code asynchrone. Les données que nous avons renvoyées de notre service dans notre exemple étaient des données fictives codées en dur. Nous l'avons rendu tel quel et l'avons affiché immédiatement. Mais dans une application du monde réel, ce ne serait pas le cas, car la plupart du temps, nous extrairions les données d'un serveur.       
La gestion des réponses et des données d'un serveur devient légèrement différente de ce que nous avons fait. Nous pourrions passer un appel pour récupérer la liste des stocks sur le serveur. Ensuite, à un moment ultérieur, une fois que notre serveur aura fini de traiter la demande, nous obtiendrions une liste de stocks. Ainsi, les stocks ne seraient pas disponibles immédiatement à la demande, mais ultérieurement, de manière **asynchrone**.       
Dans AngularJS, nous avions l'habitude de gérer ces situations à l'aide de promesses. Les promesses étaient un meilleur moyen de gérer le comportement asynchrone que les rappels, qui étaient la méthode traditionnelle, pour plusieurs raisons. Cela dit, il y a quelques inconvénients qu'Angular essaie de supprimer en passant à l'utilisation d'observables.     
Les **observables sont un concept ReactiveX** qui permet de traiter des flux qui émettent des données. Tout intéressé peut alors être observateur sur ce flux, et effectuer des opérations et des transformations sur les événements émis par le flux.     
principalement, il existe quelques différences entre les observables et les promesses:   
* Les promesses fonctionnent sur un seul événement asynchrone, tandis que les observables nous permettent de traiter un flux de zéro ou plusieurs événements asynchrones.     
* Contrairement aux promesses, les observables peuvent être annulés. C'est-à-dire que le gestionnaire de réussite ou d'erreur d'une promesse sera éventuellement appelé, tandis que nous pouvons annuler un abonnement et ne pas traiter les données si nous ne nous en soucions pas.      
* Les observables nous permettent de composer et de créer facilement une chaîne de transformations. Les opérateurs qu'il fournit prêts à l'emploi permettent des compositions fortes et puissantes, et des opérations telles que la nouvelle tentative et la relecture rendent la gestion de certains cas d'utilisation courants triviales. Tout cela en pouvant réutiliser notre code d'abonnement.       

Cela dit, les promesses sont bonnes pour les cas d'événement unique et restent une option lorsque vous travaillez avec Angular. Un observable peut être converti en promesse puis traité dans Angular. Mais il est recommandé d'utiliser des observables, car Angular fournit beaucoup de support prêt à l'emploi pour RxJS et ses extensions dans son cadre.     

Prenons maintenant notre exemple et déplaçons-le étape par étape vers l'utilisation d'observables et préparons-le pour nos futurs cas d'utilisation.   
Tout d'abord, nous allons modifier notre StockService pour commencer à renvoyer un observable asynchrone afin de nous préparer pour l'avenir lorsque nous commencerons à nous intégrer aux serveurs. Ensuite, nous modifierons nos composants pour souscrire à ces observables et traiter les cas de réussite et d'erreur.    

    import { Injectable } from '@angular/core';
    import { Observable, of, throwError } from 'rxjs';  // ligne 2
    import { Stock } from '../model/stock';

    @Injectable({
    providedIn: 'root'
    })
    export class StockService {

    private stocks: Stock[];
    constructor() {
        this.stocks = [
        new Stock('Test Stock Company', 'TSC', 85, 80, 'NASDAQ'),
        new Stock('Second Stock Company', 'SSC', 10, 20, 'NSE'),
        new Stock('Last Stock Company', 'LSC', 876, 765, 'NYSE')
        ];
    }

    getStocks(): Observable<Stock[]> {  // ligne 19
        return of(this.stocks); // ligne 20
    }

    createStock(stock: Stock): Observable<any> {
        let foundStock = this.stocks.find(each => each.code === stock.code);
        if (foundStock) {
        return throwError({msg: 'Stock with code ' +
            stock.code + ' already exists'});   // ligne 26
        }
        this.stocks.push(stock);
        return of(this.stocks);
    }
    
    toggleFavorite(stock: Stock): Observable<Stock> {
        let foundStock = this.stocks.find(each => each.code === stock.code);
        foundStock.favorite = !foundStock.favorite;
        return of(foundStock);
    }
    }
* ligne 2: importation d'Observable et des méthode core d'observable comme of et throwError.   
* ligne 19: Changer le type de retour de getStocks en un observable. 
* ligne 20: Retour d'un observable pour des données fictives.  
* ligne 26: Lancer une exception à l'observateur.   

La première chose que nous faisons est d'importer Observable depuis la bibliothèque RxJS. Notez que nous importons les opérateurs et les classes individuellement à partir des fichiers respectifs, plutôt que d'importer l'intégralité de la bibliothèque RxJS.    
Nous modifions ensuite le type de retour de chacune des méthodes du service pour renvoyer une valeur observable au lieu d'une valeur synchrone. Il s'agit d'assurer une interface API cohérente à l'utilisateur du service. Une fois cette modification effectuée, nous pouvons modifier l'implémentation en dessous (par exemple, passer de données fictives à un appel de serveur) sans avoir à modifier chaque composant.       

Modifions maintenant les composants qui intégrent le service avec les nouvelles API asynchrones. Tout d'abord, nous allons changer le StockListComponent, pour lire la liste des stocks à partir de l'observable au lieu de lire directement le tableau.    

    .....
    import { Subject } from 'rxjs';
    .....
    export class StockListComponent implements OnInit {

    public stocks: Stock[];
    constructor(private stockSrv: StockService) { }

    ngOnInit(): void {
        this.stockSrv.getStocks().subscribe( res => { // ligne 17
        this.stocks = res;
        });
    }

     onToggleFavorite(stock: Stock) {
        console.log('Favorite for stock ', stock, ' was triggered');
        this.stockSrv.toggleFavorite(stock);
     }
    }
* ligne 17: S'abonner à l'observable.   

Nous avons apporté une petite modification, qui concerne le bloc ngOnInit du composant. Au lieu d'affecter directement la valeur de retour de l'appel stockService.getStocks() au tableau stocks, nous **souscrivons (subscribe)** maintenant à **l'observable** qu'il renvoie. L'observable est déclenché une fois avec le tableau de stocks, auquel cas nous attribuons la valeur à notre tableau local. Il n'y a pas de changement en tant que tel pour le onToggleFavorite, bien que nous devions également souscrire à l'observable qu'il renvoie pour une gestion appropriée.