                                            stock-market Poject

# Présentation angulaire: (Introducing Angular)
les applications à page unique "Single Page Application" (SPA) sont devenues un choix très courant dans la création d'expériences front-end, car elles permettent d'excellentes expériences client en termes de vitesse et de réactivité. Une fois l'application initiale chargée dans le navigateur d'un client, les interactions ultérieures n'ont plus qu'à se soucier du chargement des données supplémentaires nécessaires, sans recharger la page entière comme c'était la norme avec les pages rendues côté serveur du passé.     
### Pourquoi angulaire: 
Angular en tant que framework offre quelques avantages importants tout en fournissant une structure commune aux développeurs d'une équipe avec laquelle travailler. Il nous permet de développer de grandes applications de manière maintenable. Nous approfondirons chacun d'entre eux dans les chapitres suivants.    
* Composants personnalisés : Angular vous permet de créer vos propres composants déclaratifs qui peuvent regrouper des fonctionnalités ainsi que sa logique de rendu en morceaux réutilisables de la taille d'une bouchée. Il fonctionne également bien avec les composants Web.       
* Liaison de données (Data binding): Angular vous permet de déplacer de manière transparente vos données de votre code JavaScript principal vers la vue et de réagir aux événements de vue sans avoir à écrire vous-même le code.      
* Injection de dépendance (Dependency injection): Angular vous permet d'écrire des services modulaires et de les faire injecter là où ils sont nécessaires. Cela améliore considérablement la testabilité et la réutilisabilité des services.    
* Les tests (Testing):Les tests sont des citoyens de première classe, et Angular a été construit à partir de zéro avec la testabilité à l'esprit. Vous pouvez (et devriez !) tester chaque partie de votre application.    
* Manipulation du DOM grâce aux directives : la manipulation du DOM devient plus facile à maintenir et à tester que du pur JavaScript.    
* Architecture MVC (Modèle-Vue-Contrôleur) : architecture incontournable qui consiste à avoir une stricte séparation entre les données (Modèle), la présentation des données (Vue), et les actions possibles sur ces données (Contrôleur).    
* Complet (Comprehensive):  Angular est un framework à part entière et fournit des solutions prêtes à l'emploi pour la communication avec le serveur, le routage au sein de votre application, etc.   
### Premiers pas avec votre environnement de développement (Getting Started with Your Development Environment):   
Angular s'attend à ce que vous fassiez un peu de travail de base pour pouvoir développer de manière transparente sur votre ordinateur. Certains prérequis doivent être installés que nous aborderons dans cette section.     
Il **n'est pas obligatoire** d' utiliser node.js pour développer une application angulaire . Vous pouvez très bien aller de l' avant sans Node.js pour le développement angulaire l' application , mais il serait pas être sage de le faire ainsi. Permettez-moi de vous expliquer certaines des raisons pour lesquelles node.js nous facilite le processus de développement d'applications angulaires:   
* Node.js: L'installation de de node.js vous permet de créer un serveur Web léger pour héberger votre application localement, et **fournit aussi  le NPM**.   
* NPM (Node Package Manager): le npm vous permet de gérer vos dépendances. Ainsi, vous n'avez pas à vous soucier des opérations telles que l'ajout d'une dépendance, la suppression de certaines, la mise à jour de votre package.json.        
* Cli angulaire: npm vous donne un cli angulaire ou ng cli (interface de ligne de commande angulaire). Angular CLI est un excellent outil pour construire votre application. Ainsi, vous n'avez pas besoin d'écrire des passe-partout manuellement.    

# Commencer votre premier projet angulaire: (Starting Your First Angular Project)
Créer une nouvelle application est aussi simple que d'exécuter la commande suivante avec le CLI Angular:  

        ng new stock-market
Lorsque vous exécutez cette commande, elle génère automatiquement un squelette d'application sous le dossier stock-market avec un tas de fichiers et installe toutes les dépendances nécessaires au fonctionnement de l'application Angular. Cela peut prendre un certain temps, mais finalement, vous devriez voir la ligne suivante dans votre terminal :

    Project 'stock-market' successfully created.
### Understanding the Angular CLI (Understanding the Angular CLI):
Alors que nous venons de créer notre première application Angular, l'Angular CLI fait un peu plus que la création initiale du squelette. En fait, il est utile tout au long du processus de développement pour une variété de tâches, notamment:   
• Bootstrapping de votre application.   
• Servir l'application.  
• Exécution des tests (à la fois unitaires et de bout en bout).  
• Création d'un build pour la distribution.  
• Génération de nouveaux composants, services, routes et plus..   

### Exécution de l'application (Running the Application):  
Maintenant que nous avons généré votre application, la prochaine étape consiste à l'exécuter afin que nous puissions voir notre application en cours d'exécution dans le navigateur. Il y a techniquement deux manières de l'exécuter:   
• L'exécuter en mode développement, où la CLI angulaire compile les modifications au fur et à mesure et actualise notre interface utilisateur   
• L'exécuter en mode production, avec un build compilé optimal, servi via des fichiers statiques   

Pour l'instant, nous allons l'exécuter en mode développement, ce qui est aussi simple que d'exécuter: 

    ng serve
Ou on peut utiliser qui est recommander:  

    npm start
Enfai, cette commande est la même on ng serve, exécutera tout ce que vous avez défini pour la startcommande dans le fichier package.json.   

    "scripts": {
        "start": "ng serve"
    }
ng serve démarre un serveur de développement local sur le port 4200.   
### Bases d'une application angulaire (Basics of an Angular Application): 
À la base, toute application Angular est toujours une application à page unique (SPA), et donc son chargement est déclenché par une requête principale au serveur. Lorsque nous ouvrons une URL dans notre navigateur, la toute première demande est adressée à notre serveur (qui s'exécute dans ng serve dans ce cas). Cette demande initiale est satisfaite par une page HTML, qui charge ensuite les fichiers JavaScript nécessaires pour charger à la fois Angular ainsi que notre code d'application et nos modèles (Templates).    
Une chose à noter est que bien que nous développions notre application Angular en TypeScript, l'application Web fonctionne avec du JavaScript **transpilé**. La commande ng serve est responsable de la traduction de notre code TypeScript en JavaScript pour que le navigateur se charge.      
Si nous regardons la structure générée par Angular CLI, c'est quelque chose comme ceci:  

![Alt text](https://github.com/zyedtu/AngularUpAndRunning/blob/master/chapiter01and02/imgReadme/squelette.png?raw=true "Title")

* package.json : fichier déclarant les dépendances NPM tirées lors de l'installation du projet et nécessaire à la compilation et les tests.   
* angular.json: fournit des paramètres de configuration par défaut à l'échelle de l'espace de travail et spécifiques au projet pour les outils de construction et de développement fournis par l'interface de ligne de commande angulaire. Les valeurs de chemin indiquées dans la configuration sont relatives au dossier racine de l'espace de travail.     
* src : à la racine du répertoire src, on retrouve les fichiers classiques index.html, favicon.ico, styles.css, mais également le main.ts (bootstrap d'Angular 2), le fichier de configuration de la compilation TypeScript tsconfig.json, un fichier de définition TypeScrit typings.d.ts, et un ensemble de polyfills utiles à Angular 2.  
* karma.conf.js : fichier de paramétrage du Test runner Karma. Karma est un outil permettant de lancer des tests sur une série de browser/device automatiquement. Il est déjà configuré pour être lancé sur le navigateur Chrome avec le framework de test Jasmine.       
* tslint.json : fichier définissant les règles de codage TypeScript. Tout comme le fichier .editorconfig, il est reconnu par la majorité des éditeurs de code.     
* src/environments : on retrouve les différents fichiers de configuration spécifiques aux environnements d’exécution. les fichiers contenus dans ce dossier permettent de définir les variables spécifiques à chaque environnement d'exécution (prod, dev, integration). Par défaut, l'environnement de dev sera utilisé (fichier *environment.ts*). Si l'on souhaite utiliser le fichier de production, il est nécessaire d'ajouter le paramètre *-env=prod* lors de l'appel de la commande *ng build*.         
* index.html: c'est le Racine HTML (Root HTML), si vous jetez un œil au fichier index.html, qui se trouve dans le dossier src, vous remarquerez qu'il a l'air très propre et vierge, sans référence à aucun script ou dépendance.   
La seule chose à noter dans le code précédent est l'élément <app-root> dans le HTML, qui est le marqueur pour charger notre code d'application.     
Qu'en est-il de la partie qui charge les scripts angulaires de base et notre code d'application ? Cela est inséré dynamiquement au moment de l'exécution par la commande ng serve, qui combine toutes les bibliothèques du fournisseur, notre code d'application, les styles et les modèles en ligne chacun dans des ensembles individuels et les injecte dans index.html pour être chargé dès que la page s'affiche dans notre navigateur.   
* main.ts: c'est le point d'entrée (Entry Point), La deuxième partie importante de notre pièce de lancement de l'application est le fichier main.ts. Le fichier index.html est chargé de décider quels fichiers doivent être chargés. Le fichier main.ts, quant à lui, identifie quel module Angular (dont nous parlerons un peu plus dans la section suivante) doit être chargé au démarrage de l'application. Il peut également modifier la configuration au niveau de l'application (comme désactiver les assertions et les vérifications au niveau du framework à l'aide de l'indicateur enableProdMode()).  
* app.module.ts: c'est le module principal (Main Module), C'est à partir de là que commence votre code source spécifique à l'application. Le fichier du module d'application peut être considéré comme la configuration de base de votre application, depuis le chargement de toutes les dépendances pertinentes et nécessaires, la déclaration des composants qui seront utilisés dans votre application, jusqu'au marquage du composant principal du point d'entrée de votre application.  

        @NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            BrowserModule
        ],
        providers: [],
        bootstrap: [AppComponent]
        })
        export class AppModule { }
- @NgModule: c'est décorateur (une annotation TypeScript), qui marque cette classe comme un module.   
- declarations: le bloc de déclarations définit tous les composants qui sont autorisés à être utilisés dans la portée du HTML au sein de ce module. Tout composant que vous créez doit être déclaré avant de pouvoir être utilisé.   
- imports: Vous ne créerez pas toutes les fonctionnalités utilisées dans l'application, et le tableau des importations vous permet d'importer d'autres modules d'application et de bibliothèque Angular et ainsi de tirer parti des composants, services et autres capacités qui ont déjà été créés dans ces modules.    
- providers: les fournisseurs en français, utilisés pour enregister les services qui seront injectés dans les cpmposant.  
- bootstrap: Le tableau bootstrap définit le composant qui sert de point d'entrée à votre application. Si le composant principal n'est pas ajouté ici, votre application ne démarrera pas, car Angular ne saura pas quels éléments rechercher dans votre index.html. Dans notre exemple est le *AppComponent*.   

* AppComponent: c'est la racine composant (Root Component), Nous arrivons enfin au code Angular réel qui pilote les fonctionnalités de l'application, et dans ce cas, c'est le composant principal (et unique) que nous avons, l'AppComponent. Le code pour cela ressemble à ceci:   

        @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
        })
        export class AppComponent {
        title = 'bookAngularUpAndRunning';
        }
@Component: composant dans Angular n'est rien d'autre qu'une classe TypeScript, décorée de certains attributs et métadonnées. La classe encapsule toutes les données et fonctionnalités du composant, tandis que le décorateur spécifie comment il se traduit en HTML.   
- selector: c'est le sélecteur DOM qui est traduit en une instance de ce composant.  
- templateUrl: est le chemin d'accès au code HTML utilisé pour afficher ce composant, l'URL vers celui-ci app.component.html.  
- styl
eUrls: est le modèle de style , encapsulant tous les styles de ce composant. Angular garantit que les styles sont encapsulés, vous n'avez donc pas à vous soucier de vos classes CSS d'un composant affectant un autre. Contrairement à templateUrl, styleUrls est un tableau.      
### Création d'un composant (Creating a Component):    
Jusqu'à présent, nous avons traité le code squelette de base que la CLI angulaire a généré pour nous. Voyons maintenant l'ajout de nouveaux composants et ce que cela implique. Nous utiliserons la CLI angulaire pour générer un nouveau composant.   
##### Étapes de création de nouveaux composants (Steps in Creating New Components):  
À l'aide de la CLI angulaire, la création d'un nouveau composant consiste simplement à exécuter une simple commande. Nous allons d'abord essayer de créer un widget d'action, qui affiche le nom de l'action, son code d'action, le prix actuel et s'il a changé pour le positif ou le négatif.   

    ng generate component stock/stock-item
Avec cette commande on crée un nouveau composant sous le repertoires stock/stock-item.    
##### Utilisation de notre nouveau composant (Using Our New Component):  
Pour utiliser ce nouveau composant, Il suffit d'ajouter le le selecteur **app-stock-item** comme dans la ligne 5 dans notre fichier app.component.html. Nous créons simplement un élément en utilisant le sélecteur que nous avons défini dans notre composant. Ensuite, lorsque l'application se charge, Angular reconnaît que l'élément fait référence à un composant et déclenche le chemin de code approprié.   

        <div style="text-align:center">
            <h1>
                 Welcome to {{ title }}!
            </h1>
        <app-stock-item></app-stock-item> <!-- ligne 5 -->
        </div>
### Comprendre la liaison de données (Understanding Data Binding):   
Dans notre code nous allons modifier le composant *stock-item.component.ts* comme ci-dessous:  

        export class StockItemComponent implements OnInit {
            public name: string;
            public code: string;
            public price: number;
            public previousPrice: number;

            constructor() { }

            ngOnInit(): void {
                this.name = 'Test Stock Company';
                this.code = 'TSC';
                this.price = 85;
                this.previousPrice = 80;
            }
        }
On remarque que ce composant implemente l'interface **OnInit**, cela conduit à redéfinir la fontion **ngOnInit()**.
* ngOnInit: est un crochet (hook) de cycle de vie appelé par Angular dès qu'Angular a fini de créer le composant. La plupart du temps, nous utilisons ngOnInit pour initialiser les membres de la classe.    
* Variables de membre de classe (Class member variables): Nous avons déclaré quelques variables publiques comme variables d'instance de classe. Ces informations seront utilisées pour rendre notre modèle (name, code, etc..).    

Maintenant, modifions le Template (modèle) (le fichier stock-item.component.html) pour commencer à afficher ces informations:   

    <div class="stock-container">
        <div class="name"><h3>{{name}}</h3> - <h4>({{code}})</h4></div>
        <div class="price">$ {{price}}</div>
    </div>
De cette façon on affiche le variable name code et price sur notre navigateur.   
Nous venons d'utiliser un bloc de construction fondamental d'Angular pour rendre nos données de notre composant dans le HTML. Nous utilisons la notation double crochet ({{ }}), également appelée **interpolation**.    
##### L'interpolation (One-way data binding):  
Evaluer l'expression entre deux accolades {{ }}, puis restitue le résultat sous la forme d'une chaîne en la placant dans le code HTML. Dans ce cas, nous affichons le nom, le code et le prix *par interpolation*.        
##### Understanding Property Binding (One-way data binding): 
Jusqu'à présent, nous avons utilisé *l'interpolation* pour obtenir des données de notre code de composant vers le code HTML. Mais Angular fournit également un moyen de lier non seulement du texte, mais également des propriétés d'éléments DOM. Cela nous permet de modifier le contenu et le comportement du HTML qui est rendu dans le navigateur.        
Par exemple, essayons de modifier notre bloc stock pour mettre en évidence le prix en rouge si le prix est inférieur au l'ancien prix, et en vert s'il est égal ou supérieur à l'ancien prix.      
Nous modifions tout d'abord notre composant (le stock-item.component.ts), en ajoutant variable *public positiveChange: boolean;* et dans la fonction:  

    ngOnInit(): void {
        this.name = 'Test Stock Company';
        this.code = 'TSC';
        this.price = 85;
        this.previousPrice = 80;
        this.positiveChange = this.price >= this.previousPrice;
    }
Ensuite dans le fichier *stock-item.component.scss* on ajoute ça:   

        .positive {
            color: green;
        }
        .negative {
            color: red;
        }
Nous avons simplement ajouté dans le fichie *scss* **deux classes**, positive et négative, qui changent la couleur du texte en vert et rouge, respectivement. Voyons maintenant comment utiliser ces informations et classes dans notre fichier stock-item.component.html:   

        <div class="stock-container">
            <div class="name">{{name + ' (' + code + ')'}}</div>
            <div class="price"
                [class]="positiveChange ? 'positive' : 'negative'">$ {{price}}</div>
        </div>
Nous avons ajouté une nouvelle liaison sur *l'élément div de price*, qui se lit comme suit:      
    [class]="positiveChange ? 'positive' : 'negative'"
Il s'agit de la syntaxe angulaire pour la liaison de propriété, qui lie la valeur de l'expression à la propriété DOM entre les crochets [].     
Le [] est la syntaxe générale qui peut être utilisée avec n'importe quelle propriété sur un élément pour lier à sens unique le composant à l'interface utilisateur.    
Dans ce cas particulier, nous demandons à Angular de se lier à la propriété class de l'élément DOM à la valeur de l'expression. Angular l'évaluera comme une expression JavaScript normale et attribuera la valeur (positive dans ce cas) à la propriété class de l'élément div.      

    <div class="price" [class]="positiveChange ? 'positive' : 'negative'">$ {{price}}</div>     
Ce traduit à:  

    <div class="positive">$ {{price}}</div>            
##### Comprendre la liaison d'événements (Understanding Event Binding):  
Jusqu'à présent, nous avons travaillé sur l'utilisation des données de notre composant pour afficher les valeurs Dans le Tempalte. Dans cette section, nous allons commencer à comprendre comment gérer les interactions des utilisateurs et travailler avec les événements et la liaison d'événements dans Angular.       
Supposons que nous ajoutons un bouton permettant aux utilisateurs d'ajouter un stock dans une liste de stocks préférées.   
Tout d'abord, nous pouvons modifier notre composant *stock-item.component.ts* pour ajouter une fonction de basculement de favori, qui devrait être déclenchée chaque fois que le clic se produit depuis l'interface utilisateur:     

    export class StockItemComponent implements OnInit {

        public name: string;
        public code: string;
        public price: number;
        public previousPrice: number;
        public positiveChange: boolean;
        public favorite: boolean;

        constructor() { }

        ngOnInit(): void {
            this.name = 'Test Stock Company';
            this.code = 'TSC';
            this.price = 85;
            this.previousPrice = 80;
            this.positiveChange = this.price >= this.previousPrice;
            this.favorite = false;   
        }

        toggleFavorite() {
            console.log('We are toggling the favorite state for this stock');
            this.favorite = !this.favorite;
        }
    }
Nous avons ajouté une nouvelle variable membre booléenne publique appelée favorite, qui est initialisée avec une valeur fausse. Nous avons ensuite ajouté une nouvelle fonction appelée toggleFavorite(), qui inverse simplement la valeur booléenne de favori. Nous imprimons également un journal dans la console pour nous assurer que cela se déclenche.      
Ensuite nous modifions notre Templzte *stock-item.component.html* comme ci-dessous:

        <div class="stock-container">
            <div class="name">{{name + ' (' + code + ')'}}</div>
            <div class="price"
                [class]="positiveChange ? 'positive' : 'negative'">$ {{price}}</div>
            <button (click) = toggleFavorite() [disabled]="favorite">Add to Favorite</button>
        </div>
Nous avons ajouté un nouveau bouton dans le fichier stock-item.component.html pour permettre aux utilisateurs de cliquer et d'ajouter le stock à leur ensemble préféré. Nous utilisons le concept de liaison de données de la section précédente sur la propriété *disabled*. Ainsi, nous désactivons le bouton en fonction de la valeur booléenne favorite. Si favori est vrai, le bouton sera désactivé, et s'il est faux, le bouton sera activé. Ainsi, par défaut, le bouton est activé.       
L'autre élément majeur que nous avons sur l'élément est ce fragment:   
    (click)="toggleFavorite()"   
Cette syntaxe est appelée liaison d'événement dans Angular avec les parenthèse (). La partie gauche du symbole égal fait référence à l'événement auquel nous sommes liés. Dans ce cas, il s'agit de **l'événement click**. Tout comme la notation entre crochets fait référence aux données circulant du composant vers l'interface utilisateur, la notation entre parenthèses fait référence aux événements. Et le nom entre parenthèses est le nom de l'événement.       

Il y a des moments où nous pourrions également nous soucier de l'événement réel déclenché. Dans ces cas, Angular vous donne accès à l'événement DOM sous-jacent en donnant accès à une variable spéciale **$event**. Vous pouvez y accéder ou même le transmettre à votre fonction comme suit:    
Dans le tempalte *stock-item.component.html*:

    <button (click) = toggleFavorite($event) [disabled]="favorite">Add to Favorite</button>
et dans le comopsant *stock-item.component.ts*:   

    toggleFavorite(event) {
        console.log('We are toggling the favorite state for this stock', event);
        this.favorite = !this.favorite;
    }
Lorsque vous exécutez l'application, vous verrez que lorsque vous cliquez sur le bouton, votre log de console ajoute maintenant le MouseEvent réel qui a été déclenché, en plus de notre code précédent.        
De la même manière, nous pouvons facilement nous ajouter d'autres événements DOM standard qui sont déclenchés, comme focus, blur, submit, etc..      
##### Two-way data binding: 
Ce type de liaison de données sera déborder dans le chapitre 6 *Working with Template-Driven Forms*, lorqu'on utilise le ngModel.       
### Utilisation de modèles pour un code plus propre (Using Models for Cleaner Code):  
La dernière partie de ce chapitre couvre une bonne pratique, mais cela vaut la peine d'être adopté, d'autant plus que nous visons à créer de grandes applications Web maintenables à l'aide d'Angular. Nous voulons utiliser l'encapsulation pour nous assurer que nos composants ne fonctionnent pas avec des abstractions et des propriétés de niveau inférieur, comme nous l'avons fait précédemment lorsque le composant stock contient un nom, un prix, etc. il est plus facile de comprendre et de raisonner sur notre application et son comportement. Dans cette mesure, nous devrions idéalement modéliser notre stock lui-même en tant que type dans TypeScript et en tirer parti à la place.   
La façon dont nous le ferions dans TypeScript est de définir une **interface ou une classe** de type stock:    
On peut utiliser le CLI Angular pour génére le model Stock qui sera une classe:   

    > ng generate class model/stock
Cela générera un fichier squelette vide appelé stock.ts dans un dossier model.   
Ensuite nous allons peupler cette classe:      

        export class Stock {
            favorite: boolean = false;
            constructor(public name: string,
                        public code: string,
                        public price: number,
                        public previousPrice: number) {}    
            get isPositiveChange(): boolean {
                return this.price >= this.previousPrice;
            }
        }
Cela nous donne une belle encapsulation pendant que nous travaillons dans notre application. Notez que nous n'avons pas réellement défini le nom des variables, le code, etc. en tant que propriétés de la classe. En effet, nous utilisons la syntaxe de TypeScript pour créer automatiquement les propriétés correspondantes en fonction des arguments du constructeur en utilisant le mot-clé public. Pour en savoir plus sur les classes TypeScript, reportez-vous à la documentation officielle. En bref, nous avons créé une classe avec cinq propriétés, quatre via le constructeur et une auto-initialisée. Voyons comment nous pourrions l'utiliser maintenant dans notre composant.           

Tout d'abord on import la classe dans le composant *stock-item.component.ts*:   

    import { Stock } from 'src/app/model/stock';
puis remplacé toutes les variables membres individuelles par une variable de type Stock. Cela a considérablement simplifié le code du composant et encapsulé toute la logique et les fonctionnalités sous-jacentes dans un type TypeScript approprié. Voyons maintenant comment le stock item.component.html change pour s'adapter à ce changement :     

        <div class="stock-container">
            <div class="name">{{stock.name + ' (' + stock.code + ')'}}</div>
            <div class="price"
                [class]="stock.isPositiveChange ? 'positive' : 'negative'">$ {{stock.price}}</div>
            <button (click) = toggleFavorite($event) [disabled]="stock.favorite">Add to Favorite</button>
        </div>
Nous avons apporté quelques modifications au code HTML de notre article en stock. Premièrement, la plupart de nos références à la variable se font maintenant via la variable stock, au lieu d'accéder directement aux variables du composant. Ainsi, le nom est devenu stock.name, le code est devenu stock.code, et ainsi de suite.   
test
