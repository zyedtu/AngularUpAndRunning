            # Working with Template-Driven Forms #

Dans les chapitres jusqu'à présent, nous avons travaillé sur une application angulaire de base, avec l'échafaudage en place et en travaillant avec des composants et des interactions utilisateur très simples. Nous avons appris à créer des composants et à effectuer des liaisons de données et d'événements de base, et avons examiné les capacités et les extensions que cela permet.    

Dans ce chapitre, nous nous concentrerons uniquement sur la façon de gérer **les entrées de l'utilisateur**, principalement via l'utilisation de **formulaires**. Les formulaires sont le pilier de nombreuses applications Web et sont utilisés pour tout, de la connexion et de l'enregistrement à des cas d'utilisation plus complexes. La création et l'utilisation de formulaires ne concernent pas simplement le modèle du formulaire, mais également la liaison de données (à la fois de l'interface utilisateur au code et vice versa), le suivi de l'état du formulaire, la validation et la gestion des erreurs. Il existe deux mécanismes principaux pour travailler avec les formulaires dans Angular, et nous explorerons l'approche basée sur les modèles dans ce chapitre, suivi de la façon dont nous pouvons créer des formulaires réactifs dans le chapitre suivant.    
# Formulaires basés sur des modèles (Template-Driven Forms):  
Les formulaires basés sur des modèles dans Angular sont une extension de la façon dont nous avons créé et travaillé avec des composants jusqu'à présent. Cette approche rappelle également le fonctionnement des formulaires dans AngularJS (1.x et versions antérieures), car elle utilise une syntaxe et une méthodologie similaires. Toute personne connaissant bien cela aurait peu de problèmes à s'adapter à cela. Dans cette section, nous allons créer un formulaire simple qui nous permet d'ajouter de nouveaux stocks et de progresser à partir de là.      
Les formulaires basés sur des modèles **Template-driven forms**, comme leur nom l'indique, commencent par le modèle et utilisent la liaison de données pour obtenir les données vers et depuis vos composants. C'est **un modèle d'abord** et vous permet de piloter la logique de votre application via votre modèle.    
### Configuration des formulaires (Setting Up Forms):   
Avant de creuser dans la forme réelle et le modèle et comment cela fonctionnerait, nous devons établir quelques bases avec Angular. À ce stade, nous ne savons toujours pas comment créer plusieurs itinéraires, nous allons donc simplement, pour plus de commodité, ajouter un formulaire sur notre page principale elle-même.     
La toute première chose que nous allons faire d'importer **FormsModule** dans notre fichier app.module.ts principal si nous ne l'avons pas déjà fait. Le fichier src/app/app.module.ts devrait ressembler à ceci :

        import { NgModule } from '@angular/core';
        import { BrowserModule } from '@angular/platform-browser';
        import { FormsModule } from '@angular/forms';

        import { AppComponent } from './app.component';
        import { StockItemComponent } from './stock/stock-item/stock-item.component';

        @NgModule({
        declarations: [
            AppComponent,
            StockItemComponent
        ],
        imports: [
            BrowserModule,
            FormsModule // ligne 15
        ],
        providers: [],
        bootstrap: [AppComponent]
        })
        export class AppModule { }
* Ligne 15:on ajoute le module FormsModule dans la section des importations de notre AppModule    

Cela garantit que toutes les fonctionnalités de formulaire basées sur des modèles et intégrées à Angular sont mises à la disposition de votre application. La logique et les fonctionnalités spécifiques aux formulaires se trouvent dans un module distinct pour les performances et la taille, afin que les développeurs puissent décider s'ils ont besoin ou non de fonctionnalités spécifiques aux formulaires dans leur application.     
Le FormsModule ajoute la possibilité d'utiliser **ngModel**, *ce qui permet une* **liaison de données bidirectionnelle** *dans Angular*. Mais avant de l'utiliser, explorons les autres moyens d'y parvenir, afin de comprendre ce que ngModel fait pour nous.     
### Alternative à ngModel - Liaison d'événements et de propriétés (Alternative to ngModel—Event and Property Binding):  
À la base, ce que ngModel fait pour nous est une liaison de données bidirectionnelle. Autrement dit, chaque fois qu'un utilisateur entre du texte dans l'interface utilisateur, il lie ces données au composant. Et chaque fois que la valeur de notre composant change (par exemple en réponse à un appel de serveur ou à la logique d'initialisation), il met à jour cette valeur dans l'interface utilisateur.     
Si nous le décomposons, le premier (l'utilisateur entrant une valeur dans l'interface utilisateur) peut être géré via la liaison d'événements. Nous pouvons écouter l'événement d'entrée, récupérer la valeur de la cible de propriété d'événement et mettre à jour la valeur dans la classe de composant.     
La seconde similitude peut être simplement gérée via la liaison de données, dans laquelle nous pouvons lier la valeur de la propriété de l'élément HTML à la variable de notre composant.    

Créons d'abord un nouveau composant, appelé CreateStockComponent. Nous pouvons utiliser l'Angular CLI pour le créer en exécutant:    

        ng g c stock/create-stock
Cela créera le composant squelette . Modifions maintenant le fichier create-stock.component.ts comme suit:    

    export class CreateStockComponent implements OnInit {

        stock: Stock;
        constructor() { }

        ngOnInit(): void {
            this.stock = new Stock('test', '', 0, 0);
        }
    }
Nous utilisons le modèle généré de la CLI angulaire, mais nous avons apporté deux petits changements. Nous avons ajouté une variable membre stock avec une visibilité publique, puis l'avons initialisée avec des valeurs factices dans le constructeur.    
Jetons ensuite un coup d'œil au modèle du CreateStockComponent, où se trouve toute la magie. Nous allons éditer le fichier create-stock.component.html comme suit:     

    <h2>Create Stock Form</h2>

    <div class="FromGroup">
        <form>
            <div class="stock-name">
                <input type="text"
                placeholder="Stock Name"
                [value]="stock.name"
                (input)="stock.name=$event.target.value">
            </div>
        </form>
        <button (click)="stock.name='test'">Reset stock name</button>
    </div>

    <h4>Stock Name is {{stock.name}}</h4>

Nous avons ajouté un en-tête, suivi d'un formulaire simple avec un élément d'entrée de type texte. Enfin, nous avons un autre en-tête qui utilise l'interpolation pour afficher la valeur actuelle du nom de la variable stock dans la classe de composant. Examinons maintenant plus en détail l'élément input. Outre le type et l'espace réservé, nous avons deux liaisons dont nous devons parler:    
* La liaison de valeur indique à Angular de mettre à jour la **propriété value** de l'élément d'entrée **input** *(en HTML l'élément input à la propriété value*) à l'aide du champ stock.name dans la classe de composant. Si et quand cela change, Angular sera également responsable de la mise à jour de la propriété.       
* La liaison d'événement d'entrée demande à Angular de mettre à jour la valeur de stock.name avec la valeur de l'événement. Le $event dans ce cas est le DOM InputEvent sous-jacent, à travers lequel nous accédons à la cible et à partir de celle-ci, la valeur modifiée.   
* Enfin, nous avons un bouton qui, au clic, réinitialise la valeur de stock.name sur 'test'.     

Lorsque vous supprimez uniquement la liaison de valeur et exécutez l'application (ng serve, au cas où vous l'auriez oublié !), vous verrez que lorsque vous tapez dans la zone de texte, la valeur dans l'interface utilisateur est mise à jour au fur et à mesure que vous tapez. Mais lorsque vous cliquez sur le bouton Réinitialiser, alors que l'en-tête est mis à jour, la valeur dans la zone de texte ne l'est pas. Ainsi, le composant est mis à jour lorsque l'événement se produit, mais comme nous n'avons pas la liaison Composant → UI, l'interface utilisateur ne se met pas à jour si le composant est mis à jour sous les couvertures.    

De même, nous pouvons désactiver la liaison d'événement d'entrée. Dans ce cas, quel que soit ce que nous tapons dans la zone de texte, le modèle sous-jacent n'est pas mis à jour.   
La combinaison des deux liaisons est ce qui nous donne l'apparence d'une liaison de données bidirectionnelle.      
### ngModel:  
Bien sûr, qui d'entre nous se souvient exactement de la propriété utilisée par chaque champ de formulaire ? Qui peut se rappeler quels sont les différents événements et où les valeurs seraient disponibles ? Pour simplifier et abstraire ces informations particulières afin de faciliter l'utilisation, Angular a la directive **ngModel**.     
La directive ngModel et sa syntaxe spéciale éliminent les éléments internes de chaque type d'entrée de la part des développeurs, ce qui nous permet de développer plus facilement des applications basées sur des formulaires. Voyons comment le code est modifié lorsque nous utilisons ngModel au lieu de la liaison d'entrée et de valeur (*input and value binding*).      
La directive ngModel et sa syntaxe spéciale *éliminent les éléments internes de chaque type d'entrée* de la part des développeurs, ce qui nous permet de développer plus facilement des applications basées sur des formulaires. Voyons comment le code est modifié lorsque nous utilisons ngModel au lieu de la liaison d'entrée et de valeur.      
Nous modifierons uniquement le fichier create-stock.component.html comme suit, le reste du code reste le même:     

    <h2>Create Stock Form</h2>

    <div class="FromGroup">
        <form>
            <div class="stock-name">
                <input type="text"
                placeholder="Stock Name"
                name="stockName"
                [ngModel]="stock.name"
                (ngModelChange)="stock.name=$event">
            </div>
        </form>
        <button (click)="stock.name='test'">Reset stock name</button>
    </div>

    <h4>Stock Name is {{stock.name}}</h4>

La plupart du code HTML reste le même, à l'exception des modifications suivantes:     
* Tout d'abord, nous avons ajouté **un champ de nom (name)** à l'élément de formulaire de saisie. Ceci est nécessaire pour que la directive ngModel fonctionne. Si vous supprimez cela, vous verrez des erreurs dans la console.    
* Nous avons ajouté deux liaisons. Le premier est la liaison de données **ngModel**. Cela fait le travail de la liaison de valeur que nous avions précédemment, mais en faisant abstraction de la propriété en dessous qui doit être liée. Il pointe vers la variable membre du composant dont il prend la valeur.   
* La deuxième liaison que nous avons ajoutée est la liaison d'événement **ngModelChange**. Dans ce cas, nous mettons à jour la variable membre du composant sous-jacent (stock.name) avec la valeur de $event, qui est la valeur modifiée du champ de texte.    

Il existe une version plus simple de ceci, que nous utilisons dans la plupart des cas normaux, qui est la syntaxe **[(ngModel)]** banana-in-a-box, comme on l'appelle. Cela encapsule ces deux déclarations dans une seule expression, comme ceci:      

    <h2>Create Stock Form</h2>

    <div class="FromGroup">
        <form>
            <div class="stock-name">
                <input type="text"
                placeholder="Stock Name"
                name="stockName"
                [(ngModel)]="stock.name">
            </div>
        </form>
        <button (click)="stock.name='test'">Reset stock name</button>
    </div>

    <h4>Stock Name is {{stock.name}}</h4>
##### Pourquoi s'appelle-t-on Banana-in-a-Box ? (Why Is It Called Banana-in-a-Box ?):   
Lorsqu'elles sont utilisées ensemble, une confusion courante lors de l'utilisation de la directive ngModel pourrait être l'ordre des types de parenthèses, qu'il s'agisse de [()] ou ([]). C'est pourquoi l'équipe Angular a trouvé un surnom pour le rendre facile à retenir. Le () ressemble à une banane (oui, c'est un étirement, mais roulez avec !), et il est enfermé dans une boîte []. D'où la banane dans une boîte, qui est [()].       
### Un formulaire complet (A Complete Form):     
Maintenant que nous avons vu un champ de formulaire de base, étendons-le à un formulaire complet qui comporte différents types de contrôles liés à notre composant ainsi que la gestion de la soumission du formulaire. Nous continuerons à nous appuyer sur l'exemple précédent.        
Ci-dessous, le nouveau composant *CreateStockCompletComponent*:  

        export class CreateStockCompletComponent implements OnInit {

          public stock: Stock;
          public confirmed : boolean = false;

          constructor() {
            this.stock = new Stock('test', '', 0, 0, 'NASDAQ');
          }

          ngOnInit(): void {
          }

          setStockPrice(price) {
            this.stock.price = price;
            this.stock.previousPrice = price;
          }

          createStock() {
            console.log('Creating stock ', this.stock);
          }
        }
Nous avons ajouté quelques nouvelles pièces ici, notamment:  
* Nous avons ajouté à l'initialisation du stock (un argument 'NASDAQ' dans ce cas).   
* Nous avons ajouté confirmé, une variable membre booléenne, à la classe de composant, avec une valeur par défaut de false.    
* Nous avons créé une nouvelle fonction setStockPrice(), qui prend un prix, puis définit à la fois le prix actuel et le prix précédent du stock.    
* Enfin, nous avons une nouvelle méthode createStock, qui affiche simplement la variable stock actuelle sur la console.     

Note Templete resemble à ça:    

          <h2>Create Stock Form Complet</h2>

          <div class="container">
            <div class="form-group">
              <form (ngSubmit)="createStock()">
                <div class="row">
                  <div class="col-2"> <label>Stock Name : </label> </div>
                  <div class="col-2">
                    <input type="text" placeholder="Stock Name" name="stockName" [(ngModel)]="stock.name">
                  </div>
                </div>
                <div class="row">
                  <div class="col-2"> <label>Stock Code : </label> </div>
                  <div class="col-2">
                    <input type="text" placeholder="Stock Code" name="stockCode" [(ngModel)]="stock.code">
                  </div>
                </div>
                <div class="row">
                  <div class="col-2"> <label>Stock Price : </label> </div>
                  <div class="col-2">
                    <input type="text" placeholder="Stock Price" name="stockPrice" [(ngModel)]="stock.price">
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="input-group">
                      <select name="stockExchange" [(ngModel)]="stock.exchange">
                        <option value="NYSE">NYSE</option>
                        <option value="NASDAQ">NASDAQ</option>
                        <option value="OTHER">OTHER</option>
                      </select>
                      <div class="input-group-append">
                        <label class="input-group-text" id="inputGroup-sizing-sm">Exchange</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-2">
                    <label class ="form-check-label" for="exampleCheck1">confirmed : </label>
                  </div>
                  <div class="col-2">
                    <input type="checkbox" name="stockConfirm" [(ngModel)]="confirmed">
                  </div>
                </div>
                <button type="submit" class="btn btn-primary" [disabled]="!confirmed">Submit</button>
              </form>
            </div>
          </div>
Dans le modèle, nous avons ajouté un tout nouvel ensemble de champs de formulaire, des zones de saisie pour le code de stock et le prix, aux boutons radio pour sélectionner l'échange et une case à cocher pour confirmer si les données sont correctes. Passons en revue cette étape par étape:   
* Pour le code de stock, il reste similaire au nom de stock que nous avions. Rien de différent à part, bien sûr, la variable cible.  
* Ensuite, nous avons un select drop-down/combo box (**une liste déroulante**) nous utilisons pour définir l'échange. Cette liste déroulante liela variable de modèle (stock.exchange) à l'aide de ngModel.    
* Nous avons alors une case à cocher, qui est liée à la variable confirmée sur la classe de composant. Puisqu'il s'agit d'une case à cocher, activer et désactiver la case à cocher définit la valeur de la variable confirmée sur true et false, respectivement.    
* Enfin, nous avons un bouton de type soumettre. Ceci n'est activé que lorsque le booléen confirmé est défini sur true. En cliquant dessus, cela déclenche une soumission de formulaire, qui est ensuite interceptée par notre gestionnaire d'événements **ngSubmit au niveau du formulaire**. Cela déclenchera ensuite la méthode createStock sur notre classe de composant.    

### État de contrôle (Control State):    
La validation de formulaire angulaire pour les formulaires basés sur des modèles repose et étend la validation de formulaire native à partir du HTML. Ainsi, vous pouvez simplement utiliser la plupart des contraintes que vous connaissez et aimez déjà prêtes à l'emploi, et elles devraient fonctionner directement et proprement avec une forme angulaire. Cela dit, Angular fait le travail d'intégration de ces états de contrôle et validations avec son propre modèle interne (que ce soit ngModel ou ngForm), et c'est à nous d'utiliser ce modèle interne pour ensuite montrer le bon type de message à l'utilisateur.     

Il y a deux aspects à cela:   
* L'état (state):  qui nous permet d'avoir un aperçu de l'état du contrôle de formulaire, de savoir si l'utilisateur l'a visité, s'il l'a modifié et enfin s'il est dans un état valide.     
* La validité (validity):  qui nous indique si un contrôle de formulaire est valide ou non, et s'il n'est pas valide, la ou les raisons sous-jacentes pour lesquelles l'élément de formulaire est invalide.    

Voyons d'abord comment l'état est mis à notre disposition et comment nous pouvons l'utiliser. La directive ngModel change et ajoute des classes CSS à l'élément sur lequel elle se trouve, en fonction de l'interaction de l'utilisateur avec celui-ci. Il suit trois modes d'interaction principaux et deux classes CSS par mode d'interaction qui lui sont associées. Ils sont:   

![Alt text](https://github.com/zyedtu/AngularUpAndRunning/blob/master/chapiter06/imgReadme/controlstates.png?raw=true "Title")     

En particulier, ces états vous permettent de présenter différentes expériences ou vues aux utilisateurs selon divers scénarios. Nous pouvons utiliser le code de la section précédente comme base pour travailler, au cas où vous ne coderiez pas.      

Maintenant, pour utiliser ces classes d'état de contrôle, nous n'avons en fait pas besoin de modifier le code de classe de composant. Nous n'avons qu'à peaufiner un peu le CSS, puis à en tirer parti dans le modèle HTML du composant.   
Ajoutons d'abord les définitions de classe CSS suivantes au *create-stock-complet.component.scss*:  

      .stock-name .ng-valid,
      .stock-code .ng-pristine,
      .stock-price .ng-untouched {
        background-color: green;
      }
      .stock-name .ng-invalid,
      .stock-code .ng-dirty,
      .stock-price .ng-touched {
        background-color: pink;
      }
 le rest n'est pas important!!! 
### Validité du contrôle (Control Validity):   
Voyons ensuite comment nous pouvons tirer parti de la validation du formulaire HTML pour créer des erreurs intéressantes et significatives pour nos utilisateurs. Nous n'entrerons pas encore dans les validations personnalisées dans ce chapitre, mais nous verrons comment utiliser plusieurs validations sur les mêmes éléments et comment afficher des messages d'erreur pour les mêmes.     

En interne, **Angular possède son propre ensemble de validateurs**. Ceux-ci reflètent les validateurs de formulaire HTML qui sont ensuite utilisés pour générer un comportement similaire dans le contexte d'une application angulaire. Une fois que vous avez ajouté des validateurs à vos éléments de formulaire, Angular se charge de les exécuter à chaque fois que le contrôle du formulaire change. Cela se refléterait ensuite à chaque niveau de contrôle, ainsi qu'à un niveau agrégé au niveau du formulaire.       

Avant de creuser cela, vous pouvez jeter un œil à la barre latérale suivante pour avoir une brève compréhension des *variables de référence de modèle*, qui sont un cheval de bataille majeur dans la façon dont nous exécutons et travaillons avec la validité du contrôle de formulaire.        
##### Variables de référence de modèle (Template Reference Variables):    
Une variable de référence de modèle dans Angular nous permet d'obtenir un gestionnaire temporaire sur un élément, un composant ou une directive DOM directement dans le modèle. Il est indiqué par une syntaxe standard dans le HTML, qui est **un préfixe de #**. Par exemple, dans le code HTML suivant:     

    <input type="text" #myStockField name="stockName">
Le **#myStockField** est une variable de référence de modèle qui nous donne une référence au champ de formulaire de saisie. Nous pouvons ensuite l'utiliser comme variable dans n'importe quelle expression angulaire, ou accéder directement à sa valeur via **myStockField.value et la transmettre comme argument à une fonction**.     
En plus des éléments DOM, il peut également être utilisé pour référencer la classe/valeur sous-jacente à une directive, c'est ainsi que nous l'utilisons en conjonction avec les formulaires et les champs de formulaire.     
Par défaut, lorsque nous ne lui transmettons aucune valeur, il fera toujours référence à l'élément HTML DOM.        
##### Validation des entrées dans les formulaires basés sur des modèles (Validating input in template-driven forms):         
Pour ajouter une validation à un formulaire basé sur un modèle, Angular se base sur des attribus de validation des formulaire natif HTML comme *required, minlength, max,..*.   
Chaque fois que la valeur d'un contrôle de formulaire change, **Angular exécute la validation et génère soit une liste d'erreurs de validation (template_reference_variables.?errors)** qui entraîne un statut *INVALID*, et si la liste d'erreurs est null,ça entraîne un statut VALID.     
Ensuite nous **inspectons** l'état du contrôle en **exportant** ngModel vers une variable de référence de modèle locale.     
##### Retour au exemple:    
Nous verrons comment nous pouvons accomplir une gestion simple des erreurs via nos formulaires basés sur des modèles. Au cas où vous ne coderiez pas, vous pouvez utiliser la base de code de la section précédente. 

On va apporter qques modification à notre composant comme ci-dessous:    

      export class CreateStockCompletComponent implements OnInit {

        public stock: Stock;
        public confirmed : boolean = false;
        public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];

        constructor() {
          this.stock = new Stock('test', '', 0, 0, 'NASDAQ');
        }

        ngOnInit(): void {
        }

        setStockPrice(price) {
          this.stock.price = price;
          this.stock.previousPrice = price;
        }

        createStock(stockForm) {
          console.log('Stock form', stockForm);
          if (stockForm.valid) {
            console.log('Creating stock ', this.stock);
          } else {
            console.error('Stock form is in an invalid state');
          }
        }
      }
Nous avons apporté des modifications mineures uniquement à la méthode createStock:   
* Nous avons maintenant commencé à prendre le stockForm comme argument de la fonction. Il s'agit de l'objet ngForm représentant le formulaire que nous avons dans notre modèle, y compris tous ses contrôles et états. Nous imprimons également cela sur la console Web.    
* Nous vérifions si le formulaire est valide à l'aide de cet objet transmis, puis ne procédons qu'à la création du stock (pour ce que cela vaut, imprimez à ce stade).    
* Nous avons également modifié le constructeur pour initialiser le stock avec un nom vide, contrairement à avant.   

Voyons ensuite les modifications apportées au modèle dans *create-stock-complet.component.html*:  

      <h2>Create Stock Form Complet</h2>
      <div class="container">
        <div class="form-group">
          <form (ngSubmit)="createStock(stockForm)" #stockForm="ngForm"> <!-- ligne 3 -->
            <div class="row">
              <div class="col-2"> <label>Stock Name : </label> </div>
              <div class="col-2">
                <input type="text" placeholder="Stock Name"
                required name="stockName"
                #stockName="ngModel" <!-- ligne 9 -->
                [(ngModel)]="stock.name"> 
              </div>
              <div class="col-2" *ngIf="stockName.errors && stockName.errors.required"> <!-- ligne 12 -->
                <i class="error">Stock Name is Mandatory</i>
              </div>
            </div>
            <div class="row">
              <div class="col-2"> <label>Stock Code : </label> </div>
              <div class="col-2">
                <input type="text" placeholder="Stock Code"
                name="stockCode" 
                required  minlength="2" 
                #stockCode="ngModel" <!-- ligne 22 -->
                [(ngModel)]="stock.code">
              </div>
              <div class="col-2" *ngIf="stockCode.dirty && stockCode.invalid"> <!-- ligne 25 -->
                  <div *ngIf="stockCode.errors.required"> <!-- ligne 26 -->
                  <i class="error"> Stock Code is Mandatory </i>
                  </div>
                  <div *ngIf="stockCode.errors.minlength"> <!-- ligne 29 -->
                    <i class="error">Stock Code must be atleast of length 2</i>
                  </div>
              </div>
            </div>
            <div class="row">
              <div class="col-2"> <label>Stock Price : </label> </div>
              <div class="col-2">
                <input type="text" placeholder="Stock Price" name="stockPrice" [(ngModel)]="stock.price">
              </div>
            </div>
            <div class="row">
              <!-- <div class="col-2"> -->
                <div class="input-group col-2">
                  <select name="stockExchange"  [(ngModel)]="stock.exchange">
                    <option *ngFor="let ex of exchanges"  value="NYSE">{{ex}}</option>
                  </select>
                  <div class="input-group-append">
                    <label class="input-group-text" id="inputGroup-sizing-sm">Exchange</label>
                  </div>
                </div>
              <!-- </div> -->
            </div>
            <div class="row">
              <div class="col-2">
                <label class ="form-check-label" for="exampleCheck1">confirmed : </label>
              </div>
              <div class="col-2">
                <input type="checkbox" name="stockConfirm" [(ngModel)]="confirmed">
              </div>
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="!confirmed">Submit</button>
          </form>
        </div>
      </div>
* Ligne 3: Variable de référence de modèle stockForm pour travailler au niveau du modèle de formulaire.   
* ligne 9: Variable de référence de modèle stockName pour exposer le nom ngModel.   
* ligne 12: Vérifiez la variable de référence du modèle pour les erreurs et la présence.   
* ligne 25: Variable de référence du modèle stockCode pour exposer le code ngModel.  
* ligne 26: Vérifiez la variable de référence du modèle stockCode pour les contrôles de formulaire Dirty (était changé) et invalides.   
* ligne 29: Vérifiez les erreurs sur le stockCode.   

La plupart du modèle reste le même, mais il y a quelques éléments qui méritent d'être soulignés:    
* Nous avons ajouté une variable de référence de modèle au niveau du formulaire et à chaque niveau de contrôle. La variable de référence de modèle au niveau du formulaire (stockForm) obtient l'objet de modèle NgForm qui lui est lié, ce qui nous permet de vérifier des éléments tels que le formulaire et de contrôler la validité et les valeurs à travers celui-ci.          
* Nous avons ajouté des variables de référence de modèle (stockName, stockPrice, stockCode) sur chacune des zones de texte et lui avons attribué l'objet de modèle NgModel. Cela nous permet de vérifier le champ de formulaire pour tous les états de contrôle que nous utilisions auparavant via les classes CSS (dirty/pristine, valid/invalid, and touched/untouched), en plus des errors.    
* Pour le premier champ de formulaire (stock name), nous avons ajouté un div pour afficher le message d'erreur qu'il est requis, si l'erreur existe.     
* Pour les deuxième et troisième messages de champ, nous avons inclus le message d'erreur dans un autre div, qui vérifie d'abord si le champ de formulaire est Dirty et invalide avant de rechercher un message d'erreur particulier.
* Lors de la soumission du formulaire, nous passons la variable de référence du modèle stockForm, qui pointe vers le modèle de formulaire, à la méthode createStock. Il s'agit d'une autre capacité des variables de référence de modèle : vous pouvez les transmettre en tant qu'arguments à votre classe de composant.

# Utilisation des groupes de formulaires (Working with FormGroups):
 