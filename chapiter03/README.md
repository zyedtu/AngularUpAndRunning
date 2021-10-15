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