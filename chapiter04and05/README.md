
                        # Understanding and Using Angular Components #
Dans ce chapitre, nous approfondirons un peu les composants, ces éléments que nous avons créés pour afficher l'interface utilisateur et permettre aux utilisateurs d'interagir avec les applications que nous construisons. Nous couvrirons certains des attributs les plus utiles que vous pouvez spécifier lors de la création de composants, comment réfléchir au cycle de vie du composant et aux divers hooks qu'Angular vous offre, et enfin, comment transmettre des données dans et hors de vos composants personnalisés. À la fin du chapitre, vous devriez être capable d'effectuer les tâches les plus courantes liées aux composants tout en comprenant ce que vous faites et pourquoi.   
# Components—A Recap: 
Dans le chapitre précédent, nous avons traité des directives d'attribut et de structure, qui nous permettent de changer le comportement d'un élément existant ou de changer la structure du modèle en cours de rendu.      
Le troisième type de directives sont les composants, que nous utilisons pratiquement depuis le premier chapitre. Dans une certaine mesure, vous pouvez considérer qu'une application Angular n'est rien d'autre qu'un arbre de composants. Chaque composant à son tour a un certain comportement et un modèle qui est rendu. Ce modèle peut ensuite continuer à utiliser d'autres composants, formant ainsi une arborescence de composants, qui est l'application Angular qui est rendue dans le navigateur.       
Dans sa forme la plus simple, un composant n'est rien d'autre qu'une classe qui encapsule un comportement, et un modèle (Template). Mais il existe également plusieurs façons de définir cela, ainsi que d'autres options, que nous couvrirons dans les sections suivantes.      
# Defining a Component:   
Nous définissons un composant à l'aide du décorateur TypeScript **@Componant**. Cela nous permet d'annoter n'importe quelle classe avec des métadonnées qui enseignent à Angular comment fonctionne le composant, ce qu'il faut afficher, etc. Jetons un coup d'œil au composant stock-item que nous avons créé pour voir à quoi ressemblerait un composant simple, et nous allons construire à partir de là:   

        @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
        })
        export class AppComponent {
            // Code omitted here for clarity
        }

### Selector:  
L'attribut selector, nous permet de définir comment Angular identifie le composant lorsque il'est utilisé dans le clode HTML. Le sélecteur prend une valeur de chaîne, qui est le sélecteur CSS qu'Angular utilisera pour identifier l'élément.    
Par exemple, voici quelques façons de spécifier l'attribut selector et de l'utiliser dans le code HTML: (la première façon est recommendée)     
* selector: 'app-stock-item' entraînerait l'utilisation du composant en HTML: 
    
        <app-stock-item></app-stock-item>
* selector: '.app-stock-item', entraînerait l'utilisation du composant comme une classe CSS dans le code HTML:        

        <div class="app-stock-item"></div>
* selector: '[app-stock-item]', entraînerait l'utilisation du composant comme attribut sur un élément existant:

        <div app-stock-item></div>
### Template:  
Jusqu'à présent, nous avons utilisé templateUrl pour définir le modèle à utiliser avec un composant. Le chemin que vous transmettez à l'attribut templateUrl est **relatif** au chemin du composant. Dans le cas précédent, nous pouvons soit spécifier le templateUrl et cela fonctionnerait. Mais si vous essayez de spécifier une URL absolue ou quoi que ce soit d'autre, votre compilation va échouer.     

        templateUrl: './stock.item.component.html'
Au lieu de templateUrl, nous pourrions également spécifier le modèle en ligne dans le composant, en utilisant l'attribut **template**. Cela nous permet de faire en sorte que le composant contienne toutes les informations au lieu de les diviser en code HTML et TypeScript. Comme le code ci-dessous:     

    @Component({
    selector: 'app-stock-item',
    template: `
        <div class="stock-container">
        <div class="name">{{stock.name + ' (' + stock.code + ')'}}</div>
        <div class="price"
        [class]="stock.isPositiveChange() ? 'positive' : 'negative'">
        $ {{stock.price}}
        </div>
        <button (click)="toggleFavorite($event)"
        *ngIf="!stock.favorite">Add to Favorite</button>
        </div>
        `,
    styleUrls: ['./stock-item.component.css']
    })
    export class StockItemComponent implements OnInit {
        // Code omitted here for clarity
    }
* Remarque: template ou templateUrl peut être spécifié dans un composant. Vous ne pouvez pas utiliser les deux, mais au moins un est essentiel.   
### Styles: 
Un composant donné peut être associé à plusieurs styles. Cela vous permet d'extraire du CSS spécifique au composant. Vous pouvez soit incorporer votre CSS à l'aide de l'attribut **styles**, ou s'il y a une quantité importante de CSS, vous pouvez l'extraire dans un fichier séparé et l'intégrer dans votre composant à l'aide de l'attribut **styleUrls**.       
### Style Encapsulation:   
Angular encapsule les styles de chaque composant, pour s'assurer qu'il ne sera pas utilisé ou polué les autres. En fait, vous pouvez réellement dire à Angular s'il doit le faire ou non, ou si les styles peuvent être accessibles globalement. Vous pouvez définir cela en utilisant l'attribut **encapsulation** sur le décorateur composant. L'attribut d'encapsulation prend l'une des trois valeurs suivantes:     
* ViewEncapsulation.Emulated: Il s'agit de la valeur **par défaut**, où Angular crée un CSS spécial pour émuler le comportement fourni par les shadow DOM (pas utilisation de Shadow DOM).    
* ViewEncapsulation.Native:  Angular créera un Web Component complet avec l’utilisation du Shadow DOM et du CSS scopé au component.        
* ViewEncapsulation.None: Utilise le CSS global, sans aucune encapsulation.    

- Définition Shadow DOM: Le Shadow DOM est une notion venant des standards des Web Components, qui permettent d’encapsuler des parties du DOM, ainsi que des styles. En clair, il permet de définir du comportement interne ou d'appliquer des styles bien précis à un seul nœud du DOM, sans que tout le reste de l’application soit impacté.          

La meilleure façon de voir comment cela affecte notre application est d'apporter une légère modification et de voir comment votre application se comporte dans différentes circonstances.   
On ajoute dans le fichier *app.component.scss* ce code:   

        .name {
                font-size: 50px;
        }
Ensuite dans le composant on ajoute l'attribut **ViewEncapsulation.None**:    

        @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
        encapsulation: ViewEncapsulation.None
        })
        export class AppComponent {
                title = 'app works!';
        }
Maintenant, si nous actualisons notre application, vous verrez que le nom du stock a été gonflé à 50px. En effet, les styles appliqués sur AppComponent ne se limitent pas au composant, mais prennent désormais l'espace de noms global.         
ViewEncapsulation.None est un bon moyen d'appliquer des styles communs à tous les composants enfants, mais ajoute définitivement le risque d'affecter l'espace de noms CSS global et d'avoir des effets non intentionnels.     
# Components and Modules:   
Avant d'entrer dans les détails du cycle de vie d'un composant, examinons rapidement comment les composants sont liés aux modules et quelle est leur relation. Au chapitre 2, nous avons vu comment chaque fois que nous créions un nouveau composant, nous devions l'inclure dans un module. Si vous créez un nouveau composant et ne l'ajoutez pas à un module, Angular se plaindra que vous avez des composants qui ne font partie d'aucun module.      
Pour qu'un composant soit utilisé dans le contexte d'un module, il doit être importé dans votre fichier de déclaration de module et déclaré dans le tableau des déclarations. Cela garantit que le composant est visible pour tous les autres composants du module.     
Il existe trois attributs spécifiques dans le **NgModule** qui ont un impact direct sur les composants et leur utilisation, qu'il est important de connaître. Bien que seules les déclarations soient importantes au départ, une fois que vous commencez à travailler avec plusieurs modules, ou si vous créez ou importez d'autres modules, les deux autres attributs deviennent essentiels:    
* declarations: L'attribut declarations garantit que les composants et les directives peuvent être utilisés dans le cadre du module. L'Angular CLI ajoutera automatiquement votre composant ou directive au module lorsque vous créez un composant via le CLI Angular.    
* imports: L'attribut imports vous permet de spécifier les modules que vous souhaitez importer et accessibles dans votre module. Il s'agit principalement d'un moyen d'intégrer des modules tiers pour rendre les composants et les services disponibles dans votre application.   
* exports: L'attribut exports, offre la possibilité d'utiliser un composant dans un autre module.    
# Input and Output:
Un composant est vraiment utile lorsqu'il est réutilisable. L'un des moyens de rendre un composant réutilisable (plutôt que d'avoir des valeurs par défaut codées en dur à l'intérieur) est de transmettre différentes entrées en fonction du cas d'utilisation. De même, il peut y avoir des cas où nous voulons des hooks d'un composant lorsqu'une certaine activité se produit dans son contexte.    
Angular fournit des hooks (crochets) pour spécifier chacun d'entre eux via des décorateurs, bien nommés Input et Output. Ceux-ci, contrairement aux décorateurs Component et NgModule, s'appliquent au niveau d'une variable membre de classe.   
### Input: 
Lorsque nous ajoutons un décorateur **@Input** sur une variable membre, il vous permet automatiquement de transmettre les valeurs de cette entrée au composant via la syntaxe de liaison de données d'Angular.      
 L’input peut être de n’importe quel type TypeScript, un number, un string, ou même une classe/interface que vous aurez créée.    
 Voyons comment nous pouvons étendre notre composant stock-item du chapitre précédent pour nous permettre de passer l'objet stock, plutôt que de le re-coder en dur dans le composant:     

        export class StockItemComponent implements OnInit {
                @Input() public stock: Stock;
                constructor() { }
                ngOnInit(): void {}

                toggleFavorite(event) {
                        console.log('We are toggling the favorite state for this stock', event);
                        this.stock.favorite = !this.stock.favorite;
                }
        }
Nous avons supprimé toute logique d'instanciation du composant app-stock-item et marqué la variable stock comme entrée. Cela signifie que la logique d'initialisation a été déplacée et que le composant est uniquement responsable de la réception de la valeur du stock du composant parent et de l'affichage des données.     
Ensuite, jetons un coup d'œil à *AppComponent* et à la façon dont nous avons changé afin qu'il transmet les données au comosanr StockItemComponent:     

        export class AppComponent implements OnInit {
                title = 'Stock Market App';

                public stockObj: Stock;
                ngOnInit(): void {
                        this.stockObj = new Stock('Test Stock Company', 'TSC', 85, 80);
                }
        }
Nous venons de déplacer l'initialisation de l'objet stock de StockItemComponent vers AppComponent. Enfin, examinons le modèle de l'AppComponent pour voir comment nous pouvons transmettre le stock au StockItemComponent:     

        <div style="text-align:center">
        <h1>
        Welcome to {{ title }}!
        </h1>
        <app-stock-item [stock]="stockObj"></app-stock-item>  
        </div>
Nous utilisons la liaison de données d'Angular pour transmettre le stock de AppComponent à StockItemComponent. Le nom de l'attribut (stock) doit correspondre au nom de la variable dans le composant qui a été marqué comme entrée. Le nom de l'attribut est **sensible à la casse**, assurez-vous donc qu'il correspond exactement au nom de la variable d'entrée. La valeur que nous lui passons est la référence de l'objet dans la classe AppComponent, qui est **stockObj**.      
### Output: 
Tout comme nous pouvons transmettre des données à un composant, nous pouvons également enregistrer et écouter les événements d'un composant. Nous utilisons la liaison de données pour transmettre les données et nous utilisons la syntaxe de liaison d'événement pour s'inscrire aux événements. Nous utilisons le décorateur **@Output** pour accomplir cela.     
Nous enregistrons un **EventEmitter** en tant que sortie du composant, ensuite on déclencher l'événement à l'aide de l'objet EventEmitter, cela permet à chaque composant lié à l'évenement de recevoir la notification et de réagir en conséquence.     
Nous pouvons utiliser le code de l'exemple précédent où nous avons enregistré un décorateur @Input et continuer à partir de là. Suposant maintenant que le StockItemComponent déclenche un événement lorsqu'il est favori, et délège la gestion de données du composant vers son parent. Ainsi, nous laisserons le composant d'application parent s'enregistrer pour l'événement toggleFavorite et modifier l'état du stock lorsque l'événement est déclenché.      
On commence par la modification du code de composant *stockitem.component.ts*:  

        import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
        export class StockItemComponent implements OnInit {

                @Input() public stock: Stock;
                @Output() private toggleFavorite: EventEmitter<Stock>;

                constructor() { 
                        this.toggleFavorite = new EventEmitter<Stock>();
                }

                ngOnInit(): void {
                
                }

                onToggleFavorite(event) {
                        console.log('We are toggling the favorite state for this stock', event);
                        this.toggleFavorite.emit(this.stock); // ligne 24
                }
        }
Quelques points importants à noter :    
* Nous avons importé le décorateur Output ainsi que l'EventEmitter de la bibliothèque core Angular.  
* Nous avons créé un nouveau membre de classe appelé toggleFavorite de type EventEmitter et renommé notre méthode en onToggle Favorite.    
* Nous devons nous assurer que l'instance EventEmitter est *initialisée*, car elle n'est pas initialisée automatiquement pour nous. On fait l'instanciation dans *le constructeur*.       
* Dans la **ligne 24** de la fonction onToggleFavorite appelle simplement une fonction sur l'EventEmitter *emit(stock)* pour émettre l'intégralité de l'objet stock. Cela signifie que tous les écouteurs de l'événement toggleFavorite obtiendront l'objet stock actuel en tant que paramètre.     

Nous allons également modifier stock-item.component.html pour appeler la méthode onToggle Favorite au lieu de toggleFavorite. Le balisage HTML reste à peu près le même:   

        <div class="stock-container">
                <div class="name">{{stock.name + ' (' + stock.code + ')'}}</div>
                <div class="price"
                        [class]="stock.isPositiveChange ? 'positive' : 'negative'">$ {{stock.price}}
                </div>
                <button (click)="onToggleFavorite($event)"
                        [disabled]="stock.favorite">Add to Favorite</button>
        </div>
Ensuite, nous ajoutons une fonction à l'AppComponent qui doit être déclenchée chaque fois que la fonction onToggleFavorite est déclenchée, sur laquelle nous ajouterons une liaison d'événement:    

         onToggleFavorite(stock: Stock) {
                console.log('Favorite for stock ', stock, ' was triggered');
                this.stock.favorite = !this.stock.favorite;
        }
Enfin, relions le tout en vous abonnant à la nouvelle sortie de notre composant Stock dans le fichier app-component.html:     

        <div style="text-align:center">
                <h1>
                Welcome to {{ title }}!
                </h1>
                <app-stock-item [stock]="stock" 
                                (toggleFavorite)="onToggleFavorite($event)"></app-stock-item>  
        </div>
Nous venons d'ajouter une liaison d'événement à l'aide de la syntaxe de liaison d'événement d'Angular à la sortie déclarée dans le composant stock-item. Notez à nouveau qu'il est sensible à la casse et qu'il doit correspondre exactement à la variable membre que nous avons décorée avec le @Output.   
### Change Detection: 
Par défaut, Angular vérifie chaque liaison dans l'interface utilisateur pour voir s'il doit mettre à jour un élément de l'interface utilisateur chaque fois qu'une valeur change dans notre composant. Ceci est acceptable pour la plupart des applications, mais à mesure que nos applications deviennent de plus en plus grandes et complexes, nous pourrions vouloir contrôler comment et quand Angular met à jour l'interface utilisateur. Au lieu qu'Angular décide quand il doit mettre à jour l'interface utilisateur, nous pourrions vouloir être explicite et dire à Angular quand il doit mettre à jour l'interface utilisateur manuellement. Pour ce faire, nous utilisons l'attribut changeDetection, où nous pouvons remplacer la valeur par défaut de Change **DetectionStrategy.Default** par **ChangeDetectionStrategy.OnPush**. Cela signifie qu'après l'affchage initial, il nous appartiendra d'informer Angular lorsque la valeur change.    
Par défaut, Angular applique le mécanisme ChangeDetectionStrategy.Default à l'attribut changeDetection. Cela signifie que chaque fois qu'Angular remarquera un événement (par exemple, une réponse du serveur ou une interaction de l'utilisateur), il parcourra chaque composant de l'arborescence des composants et vérifiera chacune des liaisons individuellement pour voir si l'une des valeurs a changé et doit à mettre à jour dans la vue.     
En ravanche, Angular nous permet de changer cette stratégie de la detection de changement en mettant ChangeDetectionStrategy.OnPush, cela indique à Angular, c'est que les liaisons pour ce composant particulier devront être vérifiées uniquement en fonction de l'entrée de ce composant.     
Angular nous fournit des moyens de signaler quand vérifier les liaisons à partir du composant également, pour avoir un contrôle absolu sur la liaison de données d'Angular.   
Modifions maintenant l'exemple de code pour voir cela en action. Tout d'abord, modifiez l'article en stock.component.ts pour modifier la ChangeDetectionStrategy dans le composant enfant:     

        @Component({
        selector: 'app-stock-item',
        templateUrl: './stock-item.component.html',
        styleUrls: ['./stock-item.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
        })

        export class StockItemComponent implements OnInit {

                @Input() public stock: Stock;
                @Output() private toggleFavorite: EventEmitter<Stock>;

                constructor() { 
                        this.toggleFavorite = new EventEmitter<Stock>();
                }
                ........
                changeStockPrice() {
                        this.stock.price += 5;
                }
        }
En plus de changer la ChangeDetectionStrategy, nous avons également ajouté une autre fonction à changeStockPrice(). Nous utiliserons cette fonctions pour montrer le comportement de la détection de changement dans le contexte de notre application.     
Ensuite, modifions rapidement stock-item.component.html pour nous permettre de déclencher la nouvelle fonction. Nous allons simplement ajouter un nouveau bouton pour déclencher et modifier le cours de l'action lorsque le bouton est cliqué:     

        <div class="stock-container">
                <div class="name">{{stock.name + ' (' + stock.code + ')'}}</div>
                <div class="price"
                        [class]="stock.isPositiveChange ? 'positive' : 'negative'">$ {{stock.price}}
                </div>
                <button (click)="onToggleFavorite($event)"
                        [disabled]="stock.favorite">Add to Favorite</button>
                <button (click)="changeStockPrice()">Change Price</button>
        </div>
Il n'y a aucun changement au code HTML du modèle autre que l'ajout d'un nouveau bouton pour modifier le cours de l'action. De même, modifions rapidement le fichier principal app.component.html pour ajouter un autre bouton pour déclencher la modification du prix du composant parent.   

        <div style="text-align:center">
                <h1>
                Welcome to {{ title }}!
                </h1>
                <app-stock-item [stock]="stock" 
                                (toggleFavorite)="onToggleFavorite($event)"></app-stock-item>  
                <button (click)="changeStockObject()">Change Stock</button>
                <button (click)="changeStockPrice()">Change Price</button>
        </div>
Nous avons ajouté deux nouveaux boutons à ce modèle : un qui changera la référence de l'objet stock directement, et un autre qui modifiera la référence existante de l'objet stock pour changer le prix de l'AppComponent parent. Maintenant, enfin, nous pouvons voir comment tout cela est connecté dans le fichier app.component.ts:  

        export class AppComponent implements OnInit {
                title = 'app works !';
                public stock: Stock;
                private counter: number = 1;
                .........
                
                changeStockObject() {
                        // Cela mettra à jour la valeur dans le composant d'article en stock 
                        // car nous créons une nouvelle référence pour l'entrée de stock.
                        this.stock = new Stock('Test Stock Company - ' + this.counter++,
                        'TSC', 85, 80);
                }
                changeStockPrice() {
                        // Cela ne mettra pas à jour la valeur stock dans le composant  
                        // StockItemComponent car il modifie la même référence et angulaire 
                        // ne la vérifiera pas dans la stratégie de détection de changement OnPush.
                        this.stock.price += 10;
                }
        }
Le fichier *app.component.ts* a subi le plus de changements. Le code précédent est également bien annoté avec des commentaires pour expliquer le comportement attendu lorsque chacune de ces fonctions est déclenchée. Nous avons ajouté deux nouvelles fonctions changeStockObject() qui crée une nouvelle instance de l'objet stock dans l'AppComponent, et changeStockPrice(), qui modifie les prix de l'objet stock dans l'AppComponent. Nous avons également ajouté un compteur juste pour garder une trace du nombre de fois que nous créons un nouvel objet stock, mais ce n'est pas strictement nécessaire.     
Maintenant, lorsque vous exécutez cette application, vous devez vous attendre à voir le comportement suivant:   
* Cliquer sur Ajouter aux favoris dans StockItemComponent fonctionne toujours comme prévu.
* En cliquant sur Modifier le prix dans le composant StockItemComponent, le prix de l'action augmentera de 5$ à chaque fois.
* Cliquer sur Change Stock en dehors du StockItemComponent (dans AppComponent) changera le nom du stock à chaque clic. (C'est pourquoi nous avons ajouté le compteur!).  
* Cliquer sur Modifier le prix en dehors de StockItemComponent (dans AppComponent) n'aura aucun impact (même si la valeur réelle de l'action augmentera si vous cliquez sur Modifier le prix à l'intérieur après cela). Cela montre que le modèle est mis à jour, mais Angular ne met pas à jour la vue.
# Component Lifecycle: 
Les composants (et directives) dans Angular ont leur propre cycle de vie (création, rendu de la vue, modification, et enfin destruction). Ce cycle de vie s'exécute dans l'ordre de parcours de l'arborescence de DOM, de haut en bas. Une fois qu'Angular a rendu un composant, il démarre le cycle de vie de chacun de ses enfants, et ainsi de suite jusqu'à ce que l'ensemble de l'application soit rendu.    
Il y a des moments où ces événements de cycle de vie nous sont utiles dans le développement de notre application, donc Angular fournit des crochets (Hooks) dans ce cycle de vie afin que nous puissions observer et réagir si nécessaire.   
### Définition Hooks de cycle de vie: 
Les hooks de cycle de vie Angular ne sont rien d'autre des interface (fonction de rappel),qu'angular les invoquent lorqu'un certain événement se produit pendant le cycle de vie deu composant.   
### Liste complète des hooks:  
Ci-dessous, on trouve la liste des hooks de cycle de vie d'un composant, dans l'ordre dans lequel ils sont appelés.
![Alt text](https://github.com/zyedtu/AngularUpAndRunning/blob/master/chapiter04and05/imgReadme/hooks.png?raw=true "Title")     

Angular appellera d'abord le constructeur de chaque composant, ensuite parcoure les différentes étapes mentionnées le figure dans l'ordre. Certains d'entre eux, comme OnInit et AfterContentInit (les hooks de cycle de vie qui se terminent par **Init**) ne sont appelés qu'une **seule fois** lorsqu'un composant est initialisé, tandis que les autres sont appelés chaque fois que le contenu change. Le hook **OnDestroy** est également appelé une seule fois pour un composant.     
Chacune de ces étapes du cycle de vie est livrée avec une interface qui doit être implémentée lorsqu'un composant se soucie de ce cycle de vie particulier, et chaque interface fournit une fonction commençant par **ng** qui doit être implémentée. Par exemple, l'étape du cycle de vie **OnInit** a besoin d'une fonction appelée **ngOnInit** pour être implémentée dans le composant et ainsi de suite.   
Nous allons utiliser un exemple pour voir tout cela en action et l'ordre des étapes du cycle de vie au sein d'un composant et entre les composants.     
Il y a aussi un autre concept à apprendre, que nous aborderons brièvement dans ce chapitre, et auquel nous reviendrons plus tard plus en détail : le concept de *ViewChildren* et *ContentChildren*.    
* ViewChildren: est tout composant enfant dont les balises/sélecteurs (principalement des éléments, car c'est la recommandation pour les composants) apparaissent dans le modèle du composant. Donc, dans notre cas, app-stock-item serait un ViewChild du AppComponent.    
* ContentChildren: est tout composant enfant qui est projeté dans la vue du composant, mais qui n'est pas directement inclus dans le modèle au sein du composant. Imaginez quelque chose comme un carrousel, où la fonctionnalité est encapsulée dans le composant, mais la vue, qui peut être des images ou des pages d'un livre, vient de l'utilisateur du composant. Ceux-ci sont généralement atteints via ContentChildren. Nous aborderons cela plus en profondeur plus loin dans ce chapitre.    
### Interfaces and Functions:
TODO
# View Projection (projection de continu):  
La dernière chose que nous aborderons dans ce chapitre est le concept de projection de continue. La projection est une idée importante dans Angular car elle nous donne plus de flexibilité lorsque nous développons nos composants et nous donne encore un autre outil pour les rendre vraiment nos composant réutilisables dans différents contextes.          
La projection est utile lorsque nous voulons construire des composants mais définir certaines parties de l'interface utilisateur du composant pour qu'elles n'en fassent pas partie innée. Par exemple, supposons que nous construisions un composant pour un carrousel. Un carrousel a quelques fonctionnalités simples: il est capable d'afficher un élément et nous permet de naviguer vers l'élément suivant/précédent. Votre composant carrousel peut également avoir d'autres fonctionnalités telles que le chargement paresseux (Lazy loading), etc. Mais une chose qui n'est pas du ressort du composant carrousel est le contenu qu'il affiche. Un utilisateur du composant peut vouloir afficher une image, une page d'un livre ou tout autre élément aléatoire.    
Ainsi, dans ces cas, la vue serait contrôlée par l'utilisateur du composant et la fonctionnalité serait fournie par le composant lui-même. Ceci n'est qu'un cas d'utilisation où nous pourrions vouloir utiliser la projection dans nos composants.    
TODO demain
# 