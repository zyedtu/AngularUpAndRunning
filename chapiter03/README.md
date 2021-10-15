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

##### NgStyle: 
#####  Alternative Class and Style Binding Syntax: 
### Built-In Structural Directives:  
##### NgIf: 
##### NgFor:
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