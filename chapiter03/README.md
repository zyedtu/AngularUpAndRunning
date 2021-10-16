				Directives dans Angulaire (Useful Built-In Angular Directives)
				

Dans le chapitre précédent, nous avons implémenté notre première application Angular et en utilisant Angular CLI pour crée un nouveau projet et créer aussi des composants. Nous avons également compris comment utiliser les mécanismes de liaison de données et d'Angular.       
Dans ce chapitre, nous allons d'abord comprendre quelles sont les directives dans Angular et en quoi elles sont différentes des composants. Nous couvrirons ensuite quelques directives de base fournies par Angular et les cas d'utilisation où elles sont applicables.      
### Directives et composants (Directives and Components):
Une directive dans Angular et une classe qui vous permet d'attacher des fonctionnalités personnalisées aux éléments de votre code HTML.  En Agular il y a **3** types de direcitves. 
* Un compsoant: oui un composant est une directive, parce que le composant hérite de directive (une directive est un composant sans Template).  
* Directives d'attribut (Attribute directives):Les directives d'attribut modifient l'apparence, ou le comportement, d'un élément ou d'un composant existant sur lequel il est appliqué. NgClass et NgStyle, que nous verrons plus loin dans ce chapitre, sont des exemples de directives d'attribut.    
* Directives structurelles (Structural directives): Les directives structurelles modifient la disposition du DOM en ajoutant ou en supprimant des éléments de la vue. NgIf et NgFor sont des exemples de directives structurelles que nous verrons plus loin dans ce chapitre.     

### Built-In Attribute Directives:  
Nous allons d'abord explorer les directives d'attribut. Il existe deux directives d'attribut de base fournies par Angular, à savoir les directives NgClass et NgStyle. Les deux sont des alternatives pour les liaisons de classe et de style, dont nous avons vu la liaison de classe dans le chapitre précédent.   
* Remarque:   On fait généralement référence à la directive avec le nom de sa classe, c'est pourquoi on appelle la directive NgClass ou NgIf (en majuscule). Mais la même directive, lorsqu'elle est utilisée comme attribut HTML, est généralement ecrite en camel-case, comme ngClass ou ngIf.     

##### NgClass:
La directive NgClass nous permet d'appliquer ou de supprimer plusieurs classes CSS simultanément à partir d'un élément de notre HTML.   
Dans le chapitre précedent, nous appliquions une seule classe à notre élément pour mettre en évidence s'il s'agissait d'un changement positif ou négatif comme suit :

	<div class="price"
			[class]="stock.isPositiveChange ? 'positive' : 'negative'">$ {{stock.price}}</div>
Dans cet exemple, nous examinons simplement une valeur booléenne, puis décidons d'appliquer la classe positive ou négative en fonction de cela. Mais et si nous devions appliquer plusieurs classes CSS ? Et ils étaient tous (ou beaucoup) conditionnels ? Vous finirez par devoir écrire du code qui génère une chaîne en fonction de ces multiples conditions, de sorte que vous puissiez avoir une chaîne qui représente toutes les classes qui doivent être appliquées.      
C'est du code grossier qui ne vaut pas la peine d'être écrit ou maintenu. Donc, pour ce genre de situations, Angular fournit la directive NgClass, qui peut prendre un objet JavaScript en entrée. Pour chaque clé de l'objet qui a une valeur de vérité, Angular ajoutera cette clé (la clé elle-même, pas la valeur de la clé !) En tant que classe à l'élément. De même, chaque clé de l'objet qui a une valeur fausse sera supprimée en tant que classe de cet élément.         
Prenons un exemple pour voir cela en action. Disons que nous voulons étendre notre exemple d'avant, où au lieu de simplement une classe positive et une classe négative, nous voulons ajouter une autre classe qui dicte s'il s'agit d'un grand ou d'un petit changement. Nous voulons qu'il s'agisse d'un petit changement (indiqué par la classe CSS small-change) si le pourcentage de changement est inférieur à 1 % ; sinon ce serait un grand changement (indiqué par la classe CSS grand changement).       
Tout d'abord, nous ajoutons des nouvelles classes scss dans src/app/stock/stock-item/stock-item.component.scss, on ajoute ces deux classes scss:   

		.large-change {
			font-size: 1.2em;
		}
		.small-change {
			font-size: 0.8em;
		}
Ensuite, nous pouvons modifions notre composant *stock-item.component.ts* pour calculer et garder l'objet JSON prêt avec les classes à appliquer. Dans le composant *stock-item.component.ts* on calcule d'abord la différence entre le prix actuel et l'ancien prix, puis créer un objet qui contient toutes les données.    

		ngOnInit(): void {
			this.stock = new Stock('Test Stock Company', 'TSC', 85, 80);
			let diff = (this.stock.price / this.stock.previousPrice) - 1;
			let largeChange = Math.abs(diff) > 0.01;
			this.stockClasses = {
			"positive": this.stock.isPositiveChange,
			"negative": !this.stock.isPositiveChange,
			"large-change": largeChange,
			"small-change": !largeChange
			};
		}
Dans le code du composant, nous avons créé un objet stockClasses avec quatre clés: *positive, négative, grande variation et petite variation*. Sur la base du prix actuel et des prix précédents, chacune de ces clés aura une valeur vraie ou fausse.      
Voyons maintenant comment on peut utiliser la directive **NgClass** pour l'utiliser à la place de *la liaison de classe* que nous utilisions auparavant dans le Template *stock-item.component.html*.      

		<div class="stock-container">
			<div class="name">{{stock.name + ' (' + stock.code + ')'}}</div>
			<div class="price"
				[ngClass]="stockClasses">$ {{stock.price}}</div>
			<button (click) = toggleFavorite($event) [disabled]="stock.favorite">Add to Favorite</button>
		</div>
Nous avons remplacé:    

	[class]="stock.isPositiveChange() ? 'positive' : 'negative'"
Par:    

	[ngClass]="stockClasses">$ {{stock.price}}</div>
Maintenant si nous relance l'application, on remarque que le champ *price* est affiché en vert et en caractères légèrement plus grand, car on applique à la fois la classe *positive* et *large-change*.      
Donc avec la directive NgClass on peut fournir plusieur classes css pour un seul élément.    
Une autre chose à noter, la liaison de classe écrasait notre classe initiale *la classe price* à partir de l'élément, la directive NgClass conserve les classes sur l'élément.     
##### NgStyle: 
La directive NgStyle est de niveau inférieur que la directive NgClass. Il fonctionne de manière similaire à la NgClass en ce sens qu'il prend un objet JSON et l'applique en fonction des valeurs des clés. Mais la directive NgStyle fonctionne au niveau du style/des propriétés CSS. Les clés et les valeurs qu'il attend sont des propriétés et des attributs CSS plutôt que des noms de classe.      
Considérant que notre exemple avec NgClass utilisait des classes CSS simples affectant chacune une seule propriété CSS, voyons comment utiliser la directive NgStyle comme NgClass mais sur les propiètes *name et code* du model Stock. Tout d'abord, nous devons modifier le fichier stock-item.component.ts pour créer l'objet de style basé sur les propriétés du stock:      

		public stockStyles;

		ngOnInit(): void {
			this.stock = new Stock('Test Stock Company', 'TSC', 85, 80);
			let diff = (this.stock.price / this.stock.previousPrice) - 1;
			let largeChange = Math.abs(diff) > 0.01;
			console.log('diff', diff);
			this.stockClasses = {
			'positive': this.stock.isPositiveChange,
			'negative': !this.stock.isPositiveChange,
			'large-change': largeChange,
			'small-change': !largeChange
			};
			this.stockStyles = {
			"color": this.stock.isPositiveChange ? "green" : "red",
			"font-size": largeChange ? "1.2em" : "0.8em"
			};
		}
Semblable à la section précédente, nous avons créé un objet stockStyles. Dans le code d'initialisation, nous avons initialisé l'objet stockStyles avec les clés color et font-size. Ses valeurs sont des attributs CSS générés en fonction des propriétés du stock. Nous pouvons ensuite utiliser cet objet stockStyles comme entrée de la directive NgStyle pour la liaison.      
Nous pouvons maintenant modifier notre code HTML pour utiliser ces informations en éditant le fichier stock-item.component.html comme suit:     

		<div class="stock-container">
			<div class="name" [ngStyle]="stockStyles">{{stock.name + ' (' + stock.code + ')'}}</div>
			<div class="price"
				[ngClass]="stockClasses">$ {{stock.price}}</div>
			<button (click) = toggleFavorite($event) [disabled]="stock.favorite">Add to Favorite</button>
		</div>
Nous avons ajouté **[ngStyle]="stockStyles"**, Angular examinera les clés et les valeurs de l'objet stockStyles et ajoutera ces styles particuliers à l'élément HTML.     

Il est généralement préférable d'utiliser la classe ou les liaisons NgClass pour changer l'apparence de votre application, mais le NgStyle vous donne une autre alternives.          
#####  Alternative Class and Style Binding Syntax:   
Nous avons abordé l'utilisation de la syntaxe de liaison [class] dans le chapitre précédent, ainsi que l'alternative NgClass pour ajouter dynamiquement des classes à nos éléments à l'aide d'Angular. Il existe une troisième alternative pour les classes et les styles, qui consiste à utiliser une version singulière de la liaison de classe et de style qui ajoute et supprime une classe/un style particulier, au lieu de l'approche tout ou rien de la liaison [class].     
Nous pouvons ajouter ou supprimer des classes individuelles en fonction de l'évaluation d'une expression véridique dans Angular avec la syntaxe suivante:    

	[class.class-name]="expression"  
### Built-In Structural Directives:    
Les directives structurelles, comme discuté précédemment, sont responsables à la modification et la mise en page du HTML en ajoutant, en supprimant ou en modifiant des éléments du DOM. Tout comme les autres directives qui ne sont pas des composants, les directives structurelles sont appliquées sur un élément préexistant, et la directive opère alors sur le contenu de cet élément.     
Les directives structurelles dans Angular suivent une syntaxe très particulière, ce qui permet de reconnaître facilement une directive structurelle par rapport à une directive normale. Toutes les directives structurelles dans Angular commencent par un astérisque (*), comme:    

	<div *ngIf="stock.favorite"></div>
##### NgIf: 
Nous allons d'abord jeter un œil sur la directive structurelle NgIf. La directive NgIf vous permet de masquer ou d'afficher des éléments de manière conditionnelle dans votre interface utilisateur. La syntaxe, comme mentionné précédemment, commence par un astérisque car il s'agit d'une directive structurelle qui peut supprimer ou ajouter de manière conditionnelle des éléments à notre Template HTML.    
Nous modifions le bouton Ajouter aux favoris de sorte qu'au lieu de le désactiver, nous cachons le bouton si le stock est déjà favori. Nous n'avons pas besoin d'apporter de modifications au composant ou au code CSS, mais uniquement au fichier stockitem.component.html comme suit:    

		<div class="stock-container">
			<div class="name" [ngStyle]="stockStyles">{{stock.name + ' (' + stock.code + ')'}}</div>
			<div class="price"
				[ngClass]="stockClasses">$ {{stock.price}}</div>
			<button (click) = toggleFavorite($event) *ngIf="!stock.favorite">Add to Favorite</button>
		</div>
On a ajouté la condition avec *ngIf="!stock.favorite" sur le bouton. Cela indique à Angular d'ajouter l'élément si le stock n'est pas favori, et de le supprimer du DOM s'il est favori. Maintenant, lorsque vous chargez la page, vous verrez le bouton est affiché par défaut. Une fois que vous avez cliqué sur le bouton Ajouter aux favoris, le booléen bascule et le stock est désormais favori. Angular masquera automatiquement à ce stade le bouton de l'interface utilisateur.         
##### NgFor:  
Alors que la directive NgIf est utilisée pour afficher/masquer des éléments de manière conditionnelle, la directive NgFor est utilisée pour afficher plusieurs éléments. C'est une pratique courante d'avoir un modèle, puis de créer une instance de ce modèle pour chaque instance de notre objet.      
Tout d'abord, nous allons modifier le fichier stock-item.component.ts, juste à des fins de démonstration, pour avoir un tableau de stocks au lieu d'un stock:     

	export class StockItemComponent implements OnInit {
		public stocks: Array<Stock>;
		constructor() { }

		ngOnInit(): void {
			this.stocks = [
			new Stock('Test Stock Company', 'TSC', 85, 80),
			new Stock('Second Stock Company', 'SSC', 10, 20),
			new Stock('Last Stock Company', 'LSC', 876, 765)
			];
		}

		toggleFavorite(event, index) {
			console.log('We are toggling the favorite state for this stock', event);
			this.stocks[index].favorite = !this.stocks[index].favorite;
		}
	}
Nous avons changé le stock à un tableau d'objets de stocks. Nous avons ensuite créé des stocks factices lors de notre initialisation. Enfin, nous avons modifié le toggleFavorite pour qu'il prenne un index en tant que paramètre, au lieu de travailler avec un seul stock.    

##### NgSwitch:
##### Multiple Sibling Structural Directives:
# Understanding and Using Angular Components: 
### Components—A Recap: 
### Defining a Component: 
##### Selector
##### Template
##### Styles
##### Style Encapsulation
##### Others
### Components and Modules:
### Input and Output:
##### Input: 
##### Output: 
##### Change Detection: 
### Component Lifecycle: 
### Interfaces and Functions: