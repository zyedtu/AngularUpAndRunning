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
### État de contrôle (Control State): 
### Validité du contrôle (Control Validity):
# Utilisation des groupes de formulaires (Working with FormGroups):
 